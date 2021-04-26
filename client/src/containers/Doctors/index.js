import React, { useEffect, useState } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { Table } from '../../components';
import { api } from '../../config';

const useStyles = makeStyles({
  root: {
    padding: 16,
    margin: '16px auto',
    maxWidth: 1200
  }
});

const Doctors = () => {
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
          header={'Doctors'}
          headCells={[
            { id: 'firstname', label: 'First Name' },
            { id: 'lastname', label: 'Last Name' },
            { id: 'speciality', label: 'Speciality' },
            { id: 'status', label: 'Status' }
          ]}
          rowsData={doctorsData}
          initialOrderProp={'firstname'}
          rowsPerPage={10}
          onDelete={deleteDoctors}
        />
      </Paper>
    </>
  );
};

export default Doctors;
