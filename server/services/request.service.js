const axios = require('axios');
const { forEach } = require('p-iteration');
const Request = require('../models/Request');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');
const getAccessToken = require('../config/firebaseMessaging');
const logger = require('../utils/log/logger');
const constants = require('../constants');

const timeouts = {};

const sendNotification = async (receiver, patient, message) => {
  const accessToken = await getAccessToken();
  const [userToSend] = await User.find({ doctorId: receiver.id });

  if (accessToken && userToSend && userToSend.deviceIdToken) {
    await patient.populate('deliveryReason').populate('wardId').execPopulate();

    try {
      const result = await axios.post(
        process.env.FIREBASE_SEND_MESSAGE_API,
        {
          message: {
            token: userToSend.deviceIdToken,
            notification: {
              title: `Request from ${patient.fullName}. Ward number: ${patient.wardId?.number}`,
              body: message,
            },
            data: {
              patient: JSON.stringify(patient),
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (result) {
        console.log(
          `Request from: ${patient.fullName} sent to doctor: ${receiver.fullName}`
        );
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
      logger.error(e.message);
    }
  }
};

const setTimeoutResponse = (doctorId, requestData, notSendToDoctors = []) => {
  return setTimeout(
    (doctorId, requestData) => {
      Doctor.findById(doctorId).then((doctor) => {
        if (!doctor.patients.includes(requestData.patient.id)) {
          console.log('Doctor didn\'t respond, processing request again...');

          this.processRequest(
            requestData.patient,
            requestData.requestType,
            requestData.priority,
            requestData.requestId,
            notSendToDoctors.concat(doctorId)
          );
        }
      });
    },
    constants.DOCTOR_RESPONSE_TIMEOUT,
    doctorId,
    requestData
  );
};

exports.processRequest = async (
  patient,
  message,
  priority,
  requestId = false,
  notSendToDoctors = []
) => {
  const takingCareDoctors = await Doctor.find({
    patients: { $in: [patient.id] },
  });

  let shouldSaveRequest = false;

  if (!takingCareDoctors.length) {
    const freeDoctors = await Doctor.find({
      id: { $nin: notSendToDoctors },
      status: 'free',
    });

    const requestData = {
      patientId: patient.id,
      requestType: message,
      priority,
    };

    if (freeDoctors && freeDoctors.length) {
      let notificationSent = false;

      for (let i = 0; i < freeDoctors.length; i++) {
        const currentDoctor = freeDoctors[i];

        if (notSendToDoctors.includes(currentDoctor.id)) {
          continue;
        } else if (currentDoctor.status === 'free') {
          sendNotification(currentDoctor, patient, message);
          const responseTimeout = setTimeoutResponse(
            currentDoctor.id,
            { ...requestData, requestId, patient },
            notSendToDoctors
          );

          timeouts[currentDoctor.id] = responseTimeout;
          notificationSent = true;
          break;
        }
      }

      if (!notificationSent) {
        shouldSaveRequest = true;
      }
    } else {
      shouldSaveRequest = true;
    }

    if (shouldSaveRequest) {
      if (!requestId) {
        console.log(`Saving pending request for ${patient.fullName}`);
        await Request.create(requestData);
      } else {
        console.log(`Updating pending request for ${patient.fullName}`);
        await Request.findByIdAndUpdate(requestId, {
          ...requestData,
        });
      }

      if (['high', 'highest'].includes(priority)) {
        const nurses = await Doctor.find({
          id: { $nin: [notSendToDoctors] },
          speciality: 'nurse',
        });

        for (let i = 0; i < nurses.length; i++) {
          const currentNurse = nurses[i];
          await sendNotification(currentNurse, patient, message);
          const responseTimeout = setTimeoutResponse(
            currentNurse.id,
            { ...requestData, requestId, patient },
            notSendToDoctors
          );

          timeouts[currentNurse.id] = responseTimeout;
          break;
        }
      }
    }
  }
};

exports.processDoctorTreating = async (doctorId, patientId) => {
  const doctor = await Doctor.findById(doctorId);

  doctor.patients.push(patientId);
  doctor.status = 'occupied';
  await doctor.save();

  await Request.findOneAndUpdate({ patientId }, { status: 'resolved' });
};

exports.processDoctorFinishedTreating = async (doctorId, patientId) => {
  const doctor = await Doctor.findById(doctorId);

  doctor.patients = doctor.patients.filter(
    (patient) => patient.toString() !== patientId
  );

  if (doctor.patients.length === 0) {
    doctor.status = 'free';
  }

  if (timeouts[doctorId]) {
    clearTimeout(timeouts[doctorId]);
  }

  await doctor.save();
};

exports.processScheduledRequests = async (priorities) => {
  const scheduledRequests = await Request.find({
    status: 'opened',
    priority: { $in: priorities },
  });

  await forEach(scheduledRequests, async (request) => {
    const patient = await Patient.findById(request.patientId);

    await this.processRequest(
      patient,
      request.requestType,
      request.priority,
      request.id
    );
  });
};
