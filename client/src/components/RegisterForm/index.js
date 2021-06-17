import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: `${theme.spacing(4)}px auto`,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
  field: {
    padding: '10px 0'
  } 
}));

const RegisterForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [wards, setWards] = useState([]);
  const [deliveryReasons, setDeliveryReasons] = useState([]);

  const [patientRegistered, setPatientRegistered] = useState(null);

  useEffect(() => {
    api.get('/wards').then((result) => {
      if (result.data.status === 'success') {
        const wardsData = result.data.data.docs.map((ward) => ({
          value: ward._id,
          label: ward.number,
        }));

        setWards(wardsData);
      }
    });

    api.get('/deliveryreasons').then((result) => {
      if (result.data.status === 'success') {
        const deliveryReasonData = result.data.data.docs.map(
          (deliveryReason) => ({
            value: deliveryReason._id,
            label: deliveryReason.name,
          })
        );

        setDeliveryReasons(deliveryReasonData);
      }
    });
  }, []);

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
          <Formik
            initialValues={{
              fullName: '',
              dateOfBirth: '',
              mobileNumber: '',
              deliveryReason: '',
              diagnosis: '',
              wardId: '',
            }}
            onSubmit={(values) => registerPatient(values)}
          >
            <Form className={classes.form}>
              <Field
                className={classes.field}
                component={TextField}
                label={t('patients.register.fullname')}
                name='fullName'
                type='text'
              />
              <Field
                className={classes.field}
                component={TextField}
                name='dateOfBirth'
                type='date'
              />
              <Field
                className={classes.field}
                component={TextField}
                label={t('patients.register.mobilenumber')}
                name='mobileNumber'
                type={'number'}
              />
              <FormControl className={classes.field}>
                <InputLabel htmlFor={'deliveryReason'}>
                  {t('patients.deliveryreason')}
                </InputLabel>
                <Field
                  component={Select}
                  name='deliveryReason'
                  inputProps={{ id: 'deliveryReason' }}
                >
                  {deliveryReasons?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <Field
                className={classes.field}
                component={TextField}
                label={t('patients.register.diagnosis')}
                name='diagnosis'
                type='text'
              />
              <FormControl className={classes.field}>
                <InputLabel htmlFor={'wardId'}>
                  {t('patients.register.selectward')}
                </InputLabel>
                <Field
                  component={Select}
                  name='wardId'
                  inputProps={{ id: 'wardId' }}
                >
                  {wards.length > 1 &&
                    wards.map((ward) => (
                      <MenuItem key={ward.value} value={ward.value}>
                        {ward.label}
                      </MenuItem>
                    ))}
                </Field>
              </FormControl>
              <Button
                className={classes.submitButton}
                variant={'contained'}
                color={'primary'}
                type='submit'
              >
                {t('patients.register.button')}
              </Button>
            </Form>
          </Formik>
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
