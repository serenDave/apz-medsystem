import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  Button,
} from '@material-ui/core';
import { Select } from 'formik-material-ui';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';
import Snackbar from '../../components/UI/Snackbar';

const useStyles = makeStyles({
  form: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});

const AttachIoT = ({ match, history, location }) => {
  const [iotDevices, setIoTDevices] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();
  const { state } = location;

  const submitIoTAttachmentHandler = (data) => {
    if (data.iot !== 'nodevices') {
      api
        .patch(`/patients/${match.params.patientId}`, { iotDeviceId: data.iot })
        .then((result) => {
          if (result.data.status === 'success') {
            setSnackbarOpen(true);

            setTimeout(() => {
              history.goBack();
            }, 1000);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  useEffect(() => {
    api
      .get(`/iotdevices?device=free`)
      .then((result) => {
        if (result.data.status === 'success') {
          setIoTDevices(result.data.data.docs);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [match]);

  return (
    <Paper className='section'>
      <Typography variant='h5'>{t('attachiot.title')}</Typography>
      <Formik
        initialValues={{ iot: state?.existingDevice?._id || '' }}
        onSubmit={submitIoTAttachmentHandler}
      >
        <Form className={classes.form}>
          <FormControl>
            <InputLabel htmlFor='iot'>{t('attachiot.iot')}</InputLabel>
            <Field component={Select} name='iot' inputProps={{ id: 'iot' }}>
              {iotDevices?.length ? (
                iotDevices.map((device) => (
                  <MenuItem value={device._id} key={device._id}>
                    {device.number}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value='nodevices'>
                  {t('attachiot.nodevices')}
                </MenuItem>
              )}
              {state.existingDevice && (
                <MenuItem value={state.existingDevice._id}>
                  {state.existingDevice.number}
                </MenuItem>
              )}
            </Field>
          </FormControl>
          <Box mt={3}>
            <Button variant='contained' color='primary' type='submit'>
              {t('attachiot.submit')}
            </Button>
          </Box>
        </Form>
      </Formik>
      <Snackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={'IoT attached successfully'}
      />
    </Paper>
  );
};

export default AttachIoT;
