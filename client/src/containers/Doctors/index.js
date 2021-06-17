import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Button } from '@material-ui/core';
import { Table } from '../../components';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: 16,
    margin: '16px auto',
    maxWidth: 1200
  },
  spacer: {
    marginBottom: 200
  }
});

const Doctors = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [doctorsData, setDoctorsData] = useState([]);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    api.get('/doctors').then((result) => {
      if (result.data.status === 'success') {
        const data = result.data.data.docs.map((doctor) => ({
          id: doctor._id,
          firstname: doctor.fullName.split(' ')[0],
          lastname: doctor.fullName.split(' ')[1],
          speciality: `${doctor.speciality[0]}${doctor.speciality.slice(1).toLowerCase()}`,
          status: doctor.status
        }));

        setDoctorsData(data);
      }
    });
  }, [reload]);

  const deleteDoctors = async (selected) => {
    const result = await api.post('/doctors/delete-many', { ids: selected });

    if (result.status === 204) {
      setReload(reload + 1);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <Table
          header={t('doctors.title')}
          headCells={[
            { id: 'firstname', label: t('doctors.firstname') },
            { id: 'lastname', label: t('doctors.lastname') },
            { id: 'speciality', label: t('doctors.speciality') },
            { id: 'status', label: t('doctors.status') }
          ]}
          rowsData={doctorsData}
          initialOrderProp={'firstname'}
          rowsPerPage={10}
          onDelete={deleteDoctors}
        />
        <Link to={'/add-doctor'}>
          <Button
            variant={'contained'}
            color={'primary'}
          >
            {t('doctors.addnew')}
          </Button>
        </Link>
      </Paper>
    </>
  );
};

export default Doctors;
