import React from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { api } from '../../config';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { EntrancePDF, InfoTable } from '../../components';
import { useTranslation } from 'react-i18next';
import useInfo from '../../hooks/useInfo';

const useStyles = makeStyles({
  root: {
    padding: 16,
    maxWidth: 1200,
    margin: '16px auto',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const PatientInfo = ({ match, history }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { info: patient } = useInfo(`/patients/${match.params.id}`);
  
  const setIgnorePatient = async (ignore) => {
    const result = await api.patch(`/patients/ignore/${patient._id}`, {
      ignore,
    });

    if (result.data.status === 'success') {
      window.location.reload();
    }
  };

  const patientDisplayData = [
    [
      {
        description: t('patientinfo.dateofbirth'),
        value:
          patient && patient.dateOfBirth
            ? new Date(patient.dateOfBirth).toLocaleDateString()
            : t('patientinfo.nodiagnosis'),
      },
      {
        description: t('patientinfo.mobilenumber'),
        value:
          patient && patient.mobileNumber
            ? patient.mobileNumber
            : t('nodiagnosis'),
      },
    ],
    [
      {
        description: t('patientinfo.deliveryreason'),
        value: patient && patient.deliveryReason.name,
      },
      {
        description: t('patientinfo.diagnosis'),
        value:
          patient && patient.diagnosis
            ? patient.diagnosis
            : t('patientinfo.nodiagnosis'),
      },
    ],
    [
      {
        description: t('patientinfo.wardnumber'),
        value: patient && patient.wardId.number,
      },
      {
        description: t('patientinfo.pulse'),
        value: patient && patient.pulse,
      },
    ],
    [
      {
        description: t('patientinfo.pressure'),
        value: `${patient && patient.bloodPressure.systolic} / ${
          patient && patient.bloodPressure.diastolic
        }`,
      },
      {
        description: t('patientinfo.temperature'),
        value: patient && patient.temperature,
      },
    ],
  ];

  const iotDisplayData = [
    [
      {
        description: t('patientinfo.iot.aircondition'),
        value: patient?.iotDeviceId?.airCondition,
      },
      {
        description: t('patientinfo.iot.lighting'),
        value: patient?.iotDeviceId?.lighting,
      },
    ],
    [
      {
        description: t('patientinfo.iot.devicenumber'),
        value: patient?.iotDeviceId?.number,
      },
      {
        description: t('patientinfo.iot.readdata'),
        value: patient?.iotDeviceId?.ignored
          ? t('patientinfo.iot.no')
          : t('patientinfo.iot.yes'),
      },
    ],
  ];

  return (
    <Paper className={classes.root}>
      <Box>
        <InfoTable
          title={t('patientinfo.title')}
          titleValue={patient && patient.fullName}
          displayData={patientDisplayData}
        />
        {patient?.iotDeviceId?._id && (
          <Box mt={'40px'}>
            <InfoTable
              title={t('patientinfo.iot.title')}
              displayData={iotDisplayData}
            />
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
                borderRadius: 4,
              }}
            >
              {({ loading }) =>
                loading
                  ? t('patientinfo.iot.docloading')
                  : t('patientinfo.iot.downloaddoc')
              }
            </PDFDownloadLink>
          </Box>
        )}
        <Box mr={'20px'}>
          {patient?.iotDeviceId ? (
            patient.iotDeviceId.ignored ? (
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={() => setIgnorePatient(false)}
              >
                {t('patientinfo.iot.dontignoredata')}
              </Button>
            ) : (
              <Button
                variant={'outlined'}
                color={'secondary'}
                onClick={() => setIgnorePatient(true)}
              >
                {t('patientinfo.iot.ignoredata')}
              </Button>
            )
          ) : null}
        </Box>
        <Box mr={'20px'}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              history.push(`/edit-patient/${match.params.id}`, { patient });
            }}
          >
            {t('patientinfo.edit')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientInfo;
