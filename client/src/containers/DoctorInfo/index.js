import React from 'react';
import { Button, Paper, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { InfoTable } from '../../components';
import useInfo from '../../hooks/useInfo';

const DoctorInfo = ({ match, history }) => {
  const { t } = useTranslation();
  const { info: doctor } = useInfo(`/doctors/${match.params.id}`);

  const doctorDisplayData = [
    [
      {
        description: t('doctors.fullName'),
        value: doctor?.fullName,
      },
      {
        description: t('doctors.speciality'),
        value: doctor?.speciality,
      },
    ],
    [
      {
        description: t('doctors.status'),
        value: doctor?.status
      },
      {
        description: t('doctors.patients'),
        value: doctor?.patients?.length ? doctor?.patients.join(', ') : t('doctors.nopatients')
      }
    ]
  ];

  return (
    <Paper className='section'>
      <Box mb='20px'>
        <InfoTable
          title={t('doctors.title')}
          displayData={doctorDisplayData}
        />
      </Box>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          history.push(`/edit-doctor/${match.params.id}`, { doctor });
        }}
      >
        {t('doctors.edit')}
      </Button>
    </Paper>
  );
};

export default DoctorInfo;
