import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../../../config';
import { useTranslation } from 'react-i18next';
import PatientForm from '../Patient';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: `${theme.spacing(4)}px auto`,
  },
  submitButton: {
    padding: 10,
    marginTop: 20,
  },
  registerSuccess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const RegisterForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [patientRegistered, setPatientRegistered] = useState(null);

  const registerPatient = async (data) => {
    const result = await api.post('/patients', { ...data });

    if (result.data.status === 'success') {
      setPatientRegistered(result.data.data.doc);
    }
  };

  return (
    <div className={classes.root}>
      {!patientRegistered ? (
        <>
          <Box mb={'18px'}>
            <Typography variant={'h5'} align={'center'}>
              {t('patients.register.title')}
            </Typography>
          </Box>
          <PatientForm
            onSubmit={registerPatient}
            initialValues={{
              fullName: '',
              dateOfBirth: '',
              mobileNumber: '',
              deliveryReason: '',
              diagnosis: '',
              wardId: '',
            }}
            submitTitle={t('patients.register.button')}
          />
        </>
      ) : (
        <div className={classes.registerSuccess}>
          <Box mb={'12px'}>
            <Typography variant={'h5'} align={'center'}>
              {t('patients.register.success')}
            </Typography>
          </Box>
          <Button
            variant={'contained'}
            onClick={() => setPatientRegistered(null)}
            color={'primary'}
          >
            {t('patients.register.newbutton')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
