import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import api from '../../config/api';
import DoctorForm from '../../components/Forms/Doctor';
import Snackbar from '../../components/UI/Snackbar';

const EditDoctor = ({ history, location }) => {
  const { t } = useTranslation();
  const { doctor } = location.state;
  const [snackBarOpen, setSnackbarOpen] = useState(false);

  const submitEdit = async (data) => {
    try {
      const response = await api.patch(`/doctors/${doctor._id}`, data);
      if (response.data.status === 'success') {
        setSnackbarOpen(true);

        setTimeout(() => {
          history.goBack();
        }, 1000);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Paper className='section'>
      <DoctorForm
        onSubmit={submitEdit}
        initialValues={{
          fullName: doctor.fullName,
          speciality: doctor.speciality
        }}
        title={t('doctors.edit')}
        submitTitle={t('doctors.submitEdit')}
        edit={true}
      />
      <Snackbar
        open={snackBarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={'Doctor updated successfully'}
      />
    </Paper>
  );
};

export default EditDoctor;
