import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import Snackbar from '../../components/UI/Snackbar';
import api from '../../config/api';
import DoctorForm from '../../components/Forms/Doctor';

const AddDoctor = ({ history }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState();

  const [type, setType] = useState();
  const [message, setMessage] = useState();

  const submitHandler = (values) => {
    api
      .post('/doctors/add-doctor', values)
      .then((response) => {
        if (response.data.status === 'success') {
          setType('success');
          setMessage('Doctor registered successfully');
          setOpen(true);
        }
      })
      .catch(() => {
        setType('error');
        setMessage('Failed to register a doctor. Maybe such credentials are already used');
        setOpen(true);
      })
      .finally(() => {
        setTimeout(() => {
          history.push('/doctors');
        }, 2000);
      });
  };

  return (
    <Paper className='section'>
      <DoctorForm
        initialValues={{
          fullName: '',
          speciality: '',
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={submitHandler}
        title={t('addDoctor.title')}
        submitTitle={t('addDoctor.submit')}
      />
      {type && message && (
        <Snackbar
          open={open}
          handleClose={() => setOpen(false)}
          message={message}
          type={type}
        />
      )}
    </Paper>
  );
};

export default AddDoctor;
