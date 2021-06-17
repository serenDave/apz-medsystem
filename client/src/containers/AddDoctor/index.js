import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import * as yup from 'yup';
import api from '../../config/api';
import Snackbar from '../../components/UI/Snackbar';

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

const AddDoctor = ({ history }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState();

  return (
    <Paper className='section'>
      <Typography className={classes.heading} variant={'h5'} align={'center'}>
        {t('addDoctor.title')}
      </Typography>
      <Formik
        initialValues={{
          fullName: '',
          speciality: '',
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={yup.object({
          fullName: yup.string().required(t('form.required')),
          speciality: yup.string().required(t('form.required')),
          username: yup
            .string()
            .max(20, t('form.max20'))
            .required(t('form.required')),
          email: yup
            .string()
            .email(t('form.email'))
            .required(t('form.required')),
          password: yup
            .string()
            .min(8, t('form.min8'))
            .required(t('form.required')),
        })}
        onSubmit={(values) => {
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
        }}
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
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
          >
            {t('addDoctor.submit')}
          </Button>
        </Form>
      </Formik>
      <Snackbar
        open={open}
        handleClose={() => setOpen(false)}
        message={'Doctor registered successfully'}
      />
    </Paper>
  );
};

export default AddDoctor;
