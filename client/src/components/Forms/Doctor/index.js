import React from 'react';
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const useStyles = makeStyles({
  form: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1000,
    margin: '0 auto',
  },
  button: {
    marginTop: 20,
  },
  heading: {
    padding: '20px 0',
  },
});

const DoctorForm = ({
  onSubmit,
  initialValues,
  title,
  submitTitle,
  edit = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  let validationSchema = yup.object({
    fullName: yup.string().required(t('form.required')),
    speciality: yup.string().required(t('form.required')),
  });

  if (!edit) {
    validationSchema = yup.object({
      fullName: yup.string().required(t('form.required')),
      speciality: yup.string().required(t('form.required')),
      username: yup
        .string()
        .max(20, t('form.max20'))
        .required(t('form.required')),
      email: yup.string().email(t('form.email')).required(t('form.required')),
      password: yup
        .string()
        .min(8, t('form.min8'))
        .required(t('form.required')),
    });
  }

  return (
    <>
      <Typography className={classes.heading} variant={'h5'} align={'center'}>
        {title}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={classes.form}>
          <Field
            component={TextField}
            name='fullName'
            type='text'
            label={t('addDoctor.fullName')}
          />
          <FormControl>
            <InputLabel htmlFor='speciality'>
              {t('addDoctor.speciality')}
            </InputLabel>
            <Field
              component={Select}
              name='speciality'
              inputProps={{ id: 'speciality' }}
            >
              <MenuItem value={'surgeon'}>
                {t('doctors.specialities.surgeon')}
              </MenuItem>
              <MenuItem value={'nurse'}>
                {t('doctors.specialities.nurse')}
              </MenuItem>
            </Field>
          </FormControl>
          {!edit && (
            <>
              <Field
                component={TextField}
                name='username'
                type='text'
                label={t('addDoctor.username')}
              />
              <Field
                component={TextField}
                name='email'
                type='email'
                label={t('addDoctor.email')}
              />
              <Field
                component={TextField}
                name='password'
                type='password'
                label={t('addDoctor.password')}
              />
            </>
          )}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
          >
            {submitTitle}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default DoctorForm;
