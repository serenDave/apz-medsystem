import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../../config';

const useStyles = makeStyles({
  root: {
    padding: 16,
    maxWidth: 1200,
    margin: '16px auto',
    minHeight: 300
  }
});

const PatientInfo = ({ match }) => {
  const classes = useStyles();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.get(`/patients/${match.params.id}`).then((result) => {
      if (result.data.status === 'success') {
        setPatient(result.data.data.doc);
      }
    });
  }, [match.params.id]);

  return (
    <Paper className={classes.root}>
      <Box mb={'30px'}>
        <Typography variant={'h5'}>Пацієнт: {patient && patient.fullName}</Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'} mb={'10px'}>
        <Box flex={1}>
          <Typography variant={'body1'}>
            Дата народження:{' '}
            {patient && patient.dateOfBirth
              ? new Date(patient.dateOfBirth).toLocaleDateString()
              : 'Не вказана'}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={'body1'}>
            Мобільний телефон: {patient && patient.mobileNumber ? patient.mobileNumber : 'Не вказаний'}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} mb={'10px'}>
        <Box flex={1}>
          <Typography variant={'body1'}>
            Причина надходження до лікарні: {patient && patient.deliveryReason.name}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={'body1'}>
            Діагноз: {patient && patient.diagnosis ? patient.diagnosis : 'Не поставлений'}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} mb={'10px'}>
        <Box flex={1}>
          <Typography variant={'body1'}>Номер палати: {patient && patient.wardId.number}</Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={'body1'}>Пульс: {patient && patient.pulse}</Typography>
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} mb={'10px'}>
        <Box flex={1}>
          <Typography variant={'body1'}>
            Тиск:{' '}
            {`${patient && patient.bloodPressure.systolic} / ${patient && patient.bloodPressure.diastolic}`}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={'body1'}>Температура: {patient && patient.temperature}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientInfo;
