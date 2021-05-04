import React, { useEffect, useState } from 'react';
import { Table } from '../../components';
import { api } from '../../config';

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [reload, setReload] = useState(1);

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
  }, [reload]);

  const deleteUsers = async (selected) => {
    const result = await api.post('/users/delete-many', { ids: selected });

    if (result.status === 204) {
      setReload(reload + 1);
    }
  };

  return (
    <Table
      header={'Users'}
      headCells={[
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'role', label: 'Role' }
      ]}
      rowsData={usersData}
      initialOrderProp={'name'}
      rowsPerPage={10}
      onDelete={deleteUsers}
    />
  );
};

export default Users;
