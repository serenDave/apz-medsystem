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

const Users = () => {
  const classes = useStyles();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    api.get('/users').then((result) => {
      if (result.data.status === 'success') {
        const data = result.data.data.docs.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }));

        setUsersData(data);
      }
    });
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <Table
          header={'Users'}
          headCells={[
            { id: 'name', label: 'First Name' },
            { id: 'lastname', label: 'Last Name' },
            { id: 'role',  label: 'Role' },
          ]}
          rowsData={usersData}
          initialOrderProp={'name'}
          rowsPerPage={10}
        />
      </Paper>
    </>
  );
};

export default Users;
