const { forEach } = require('p-iteration');
const Request = require('../models/Request');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const sendNotification = (receiver, patient, message) => {
  console.log(`Sending notification of patient: ${patient} to doctor: ${receiver} with message: ${message}`);
};

const setTimeoutResponse = (doctorId, requestData, notSendToDoctors = []) => {
  setTimeout(
    (doctorId, requestData) => {
      Doctor.findById(doctorId).then((doctor) => {
        if (!doctor.patients.includes(requestData.patient.id)) {
          exports.processRequest(
            requestData.patient,
            requestData.requestType,
            requestData.priority,
            false,
            notSendToDoctors.concat(doctorId)
          );
        }
      });
    },
    1000 * 60,
    doctorId,
    requestData
  );
};

exports.processRequest = async (patient, message, priority, request = false, notSendToDoctors = []) => {
  const takingCareDoctors = await Doctor.find({
    patients: { $in: [patient.id] }
  });

  let shouldSaveRequest = false;

  if (!takingCareDoctors.length) {
    const freeDoctors = await Doctor.find({
      id: { $nin: notSendToDoctors },
      status: 'free'
    });

    const requestData = {
      patientId: patient.id,
      requestType: message,
      priority
    };

    if (freeDoctors && freeDoctors.length) {
      let notificationSent = false;

      for (let i = 0; i < freeDoctors.length; i++) {
        const currentDoctor = freeDoctors[i];

        if (notSendToDoctors.includes(currentDoctor.id)) {
          continue;
        } else if (currentDoctor.status === 'free') {
          sendNotification(currentDoctor.fullName, patient.fullName, message);
          setTimeoutResponse(currentDoctor.id, { ...requestData, patient }, notSendToDoctors);
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
      console.log(`Saving request for ${patient.fullName}`)

      if (!request) {
        await Request.create(requestData);
      } else {
        await Request.findByIdAndUpdate(request.id, {
          ...requestData
        });
      }

      if (['high', 'highest'].includes(priority)) {
        const nurses = await Doctor.find({
          id: { $nin: [notSendToDoctors] },
          speciality: 'NURSE'
        });

        for (let i = 0; i < nurses.length; i++) {
          const currentNurse = nurses[i];
          sendNotification(currentNurse.fullName, patient.fullName, message);
          setTimeoutResponse(currentNurse.id, { ...requestData, patient }, notSendToDoctors);
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

  doctor.patients = doctor.patients.filter((patient) => patient.toString() !== patientId);

  if (doctor.patients.length === 0) {
    doctor.status = 'free';
  }

  await doctor.save();
};

exports.processScheduledRequests = async (priorities) => {
  const scheduledRequests = await Request.find({
    status: 'opened',
    priority: { $in: priorities }
  });

  await forEach(scheduledRequests, async (request) => {
    const patient = await Patient.findById(request.patientId);

    await this.processRequest(patient, request.requestType, request.priority);
  });
};
