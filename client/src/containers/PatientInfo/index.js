import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../../config';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { EntrancePDF } from '../../components';

const useStyles = makeStyles({
  root: {
    padding: 16,
    maxWidth: 1200,
    margin: '16px auto'
  },
  boldText: {
    fontWeight: 'bold'
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

  const setIgnorePatient = async (ignore) => {
    const result = await api.patch(`/patients/ignore/${patient._id}`, { ignore });

    if (result.data.status === 'success') {
      window.location.reload();
    }
  };

  return (
    <Paper className={classes.root}>
      <Box>
        <Typography variant={'h5'}>Пацієнт: {patient && patient.fullName}</Typography>
        <hr />
        <Box display={'flex'} alignItems={'center'} mb={'10px'}>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Дата народження:
            </Typography>
            <Typography variant={'body1'}>
              {patient && patient.dateOfBirth
                ? new Date(patient.dateOfBirth).toLocaleDateString()
                : 'Не вказана'}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Мобільний телефон:
            </Typography>
            <Typography variant={'body1'}>
              {patient && patient.mobileNumber ? patient.mobileNumber : 'Не вказаний'}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} mb={'10px'}>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Причина надходження до лікарні:
            </Typography>
            <Typography variant={'body1'}>{patient && patient.deliveryReason.name}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Діагноз:
            </Typography>
            <Typography variant={'body1'}>
              {patient && patient.diagnosis ? patient.diagnosis : 'Не поставлений'}
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} mb={'10px'}>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Номер палати:
            </Typography>
            <Typography variant={'body1'}>{patient && patient.wardId.number}</Typography>
          </Box>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Пульс:
            </Typography>
            <Typography variant={'body1'}>{patient && patient.pulse} </Typography>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} mb={'10px'}>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Тиск:
            </Typography>
            <Typography variant={'body1'}>
              {`${patient && patient.bloodPressure.systolic} / ${patient && patient.bloodPressure.diastolic}`}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant={'body1'} className={classes.boldText}>
              Температура:
            </Typography>
            <Typography variant={'body1'}>{patient && patient.temperature}</Typography>
          </Box>
        </Box>
        {patient && patient.iotDeviceId && patient.iotDeviceId._id && (
          <Box mt={'40px'}>
            <Typography variant={'h5'}>Дані з IoT пристрою:</Typography>
            <hr />
            <Box display={'flex'} alignItems={'center'} mb={'10px'}>
              <Box flex={1}>
                <Typography variant={'body1'} className={classes.boldText}>
                  Якість повітря:
                </Typography>
                <Typography variant={'body1'}>{patient.iotDeviceId.airCondition}</Typography>
              </Box>
              <Box flex={1}>
                <Typography variant={'body1'} className={classes.boldText}>
                  Освітлення:
                </Typography>
                <Typography variant={'body1'}>{patient.iotDeviceId.lighting}</Typography>
              </Box>
            </Box>
            <Box display={'flex'}>
              <Box flex={1}>
                <Typography variant={'body1'} className={classes.boldText}>
                  Номер пристрою:
                </Typography>
                <Typography variant={'body1'}>{patient.iotDeviceId.number}</Typography>
              </Box>
              <Box flex={1}>
                <Typography variant={'body1'} className={classes.boldText}>
                  Зчитувати дані:
                </Typography>
                <Typography variant={'body1'}>{patient.iotDeviceId.ignored ? 'Ні' : 'Так'}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box mt={'40px'} display={'flex'} alignItems={'center'}>
        {patient && (
          <Box mr={'20px'}>
            <PDFDownloadLink
              document={<EntrancePDF patientData={patient} />}
              fileName={'patientEntrance.pdf'}
              style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                textTransform: 'uppercase',
                padding: '8px',
                color: '#4a4a4a',
                backgroundColor: '##3f51b5',
                border: '1px solid #4a4a4a',
                borderRadius: 4
              }}
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Завантажити документ про надходження')}
            </PDFDownloadLink>
          </Box>
        )}
        <Box mr={'20px'}>
          {patient && patient.iotDeviceId.ignored ? (
            <Button variant={'outlined'} color={'primary'} onClick={() => setIgnorePatient(false)}>
              Зчитувати дані пацієнта з IoT пристрою
            </Button>
          ) : (
            <Button variant={'outlined'} color={'secondary'} onClick={() => setIgnorePatient(true)}>
              Не зчитувати дані пацієнта з IoT пристрою
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientInfo;
