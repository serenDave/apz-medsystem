const { forEach } = require('p-iteration');
const Request = require('../models/Request');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const sendNotification = (receiver, patient, message) => {
  console.log(`Sending notification of patient: ${patient} to doctor: ${receiver} with message: ${message}`);
};

exports.processRequest = async (patient, message, priority, request = false) => {
  const takingCareDoctors = await Doctor.find({
    patients: { $in: [patient.id] }
  });

  if (!takingCareDoctors.length) {
    const freeDoctors = await Doctor.find({
      status: 'free'
    });

    if (freeDoctors && freeDoctors.length) {
      freeDoctors.forEach((doctor) => {
        sendNotification(doctor.fullName, patient.fullName, message);
      });
    } else {
      const requestData = {
        patientId: patient.id,
        requestType: message,
        priority
      };

      if (!request) {
        await Request.create(requestData);
      } else {
        await Request.findByIdAndUpdate(request.id, {
          ...requestData
        });
      }

      if (['high', 'highest'].includes(priority)) {
        const nurses = await Doctor.find({
          speciality: 'NURSE'
        });

        nurses.forEach((nurse) => {
          sendNotification(nurse.fullName, patient.fullName, message);
        });
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

    await this.processRequest(patient, request.message, request.priority);
  });
};
