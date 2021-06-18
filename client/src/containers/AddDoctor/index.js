import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@material-ui/core';
import Snackbar from '../../components/UI/Snackbar';
import api from '../../config/api';
import DoctorForm from '../../components/Forms/Doctor';

const AddDoctor = ({ history }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState();

  const submitHandler = (values) => {
    api
      .post('/doctors/add-doctor', values)
      .then((response) => {
        if (response.data.status === 'success') {
          setOpen(true);

          setTimeout(() => {
            history.push('/doctors');
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
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
      <Snackbar
        open={open}
        handleClose={() => setOpen(false)}
        message={'Doctor registered successfully'}
      />
    </Paper>
  );
};

export default AddDoctor;
