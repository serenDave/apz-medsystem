import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: `${theme.spacing(4)}px auto`
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  submitButton: {
    padding: 10,
    marginTop: 20
  },
  registerSuccess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const RegisterForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { register, watch, setValue, handleSubmit } = useForm();

  const [wards, setWards] = useState([]);
  const [deliveryReasons, setDeliveryReasons] = useState([]);

  const [patientRegistered, setPatientRegistered] = useState(null);

  const { fullName, dateOfBirth, mobileNumber, deliveryReason, wardId } = watch();

  useEffect(() => {
    register('fullName');
    register('dateOfBirth');
    register('mobileNumber');
    register('deliveryReason');
    register('wardId');

    api.get('/wards').then((result) => {
      if (result.data.status === 'success') {
        const wardsData = result.data.data.docs.map((ward) => ({
          value: ward._id,
          label: ward.number
        }));

        setWards(wardsData);
      }
    });

    api.get('/deliveryreasons').then((result) => {
      if (result.data.status === 'success') {
        const deliveryReasonData = result.data.data.docs.map((deliveryReason) => ({
          value: deliveryReason._id,
          label: deliveryReason.name
        }));

        setDeliveryReasons(deliveryReasonData);
      }
    });
  }, [register]);

  const registerPatient = async (data) => {
    const result = await api.post('/patients', {
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      mobileNumber: data.mobileNumber,
      deliveryReason: data.deliveryReason,
      wardId: data.wardId
    });

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
          <div className={classes.form}>
            <TextField
              label={t('patients.register.fullname')}
              value={fullName}
              onChange={(e) => setValue('fullName', e.target.value)}
              variant={'outlined'}
              margin={'normal'}
            />
            <TextField
              value={dateOfBirth}
              onChange={(e) => setValue('dateOfBirth', e.target.value)}
              variant={'outlined'}
              margin={'normal'}
              type={'date'}
            />
            <TextField
              label={t('patients.register.mobilenumber')}
              value={mobileNumber}
              onChange={(e) => setValue('mobileNumber', e.target.value)}
              variant={'outlined'}
              margin={'normal'}
              type={'number'}
            />
            <TextField
              select
              label={t('patients.deliveryreason')}
              value={deliveryReason}
              onChange={(e) => setValue('deliveryReason', e.target.value)}
              variant={'outlined'}
              margin={'normal'}
            >
              {deliveryReasons.length > 1 &&
                deliveryReasons.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              select
              label={t('patients.register.selectward')}
              value={wardId}
              onChange={(e) => {
                setValue('wardId', e.target.value);
              }}
              variant={'outlined'}
              margin={'normal'}
            >
              {wards.length > 1 &&
                wards.map((ward) => (
                  <MenuItem key={ward.value} value={ward.value}>
                    {ward.label}
                  </MenuItem>
                ))}
            </TextField>
            <Button
              className={classes.submitButton}
              variant={'contained'}
              color={'primary'}
              onClick={handleSubmit(registerPatient)}
            >
              {t('patients.register.button')}
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.registerSuccess}>
          <Box mb={'12px'}>
            <Typography variant={'h5'} align={'center'}>
              {t('patients.register.success')}
            </Typography>
          </Box>
          <Button variant={'contained'} onClick={() => setPatientRegistered(null)} color={'primary'}>
            {t('patients.register.newbutton')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
