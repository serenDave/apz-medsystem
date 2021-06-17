import React, { useState, useEffect } from 'react';
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { api } from '../../../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    padding: '10px 0'
  }
});

const Patient = ({ onSubmit, initialValues, submitTitle }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [wards, setWards] = useState([]);
  const [deliveryReasons, setDeliveryReasons] = useState([]);

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
          <Field component={Select} name='wardId' inputProps={{ id: 'wardId' }}>
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
          {submitTitle}
        </Button>
      </Form>
    </Formik>
  );
};

export default Patient;
