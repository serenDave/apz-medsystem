import React, { useState } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import PatientForm from '../../components/Forms/Patient';
import { useTranslation } from 'react-i18next';
import { api } from '../../config';
import Snackbar from '../../components/UI/Snackbar';

const EditPatient = ({ history, location }) => {
  const { t } = useTranslation();
  const { patient } = location.state;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const submitEdit = async (data) => {
    try {
      const response = await api.patch(`/patients/${patient._id}`, data);
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
      <Box mb={'18px'}>
        <Typography variant={'h5'} align={'center'}>
          {t('patientinfo.title')}
        </Typography>
      </Box>
      <PatientForm
        onSubmit={submitEdit}
        initialValues={{
          fullName: patient.fullName,
          dateOfBirth: patient?.dateOfBirth,
          mobileNumber: patient.mobileNumber,
          deliveryReason: patient.deliveryReason?._id,
          diagnosis: patient.diagnosis,
          wardId: patient.wardId?._id,
        }}
        submitTitle={t('patientinfo.submitEdit')}
      />
      <Snackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={'Patient updated successfully'}
      />
    </Paper>
  );
};

export default EditPatient;
