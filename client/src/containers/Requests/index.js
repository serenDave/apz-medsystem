import React, { useEffect, useState } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { Table } from '../../components';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    padding: 16,
    margin: '16px auto',
    maxWidth: 1200
  }
});

const Requests = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [requestData, setRequestData] = useState([]);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    api.get('/requests').then((result) => {
      if (result.data.status === 'success') {
        const data = result.data.data.docs.map((request) => ({
          id: request._id,
          patient: request.patientId.fullName,
          requesttype: request.requestType,
          priority: request.priority,
          status: request.status,
        }));

        setRequestData(data);
      }
    });
  }, [reload]);

  const deleteRequests = async (selected) => {
    const result = await api.post('/requests/delete-many', { ids: selected });

    if (result.status === 204) {
      setReload(reload + 1);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <Table
          header={t('request.title')}
          headCells={[
            {
              id: 'patient',
              numeric: false,
              disablePadding: true,
              label: t('request.patient'),
              notAlignRight: true
            },
            { id: 'requesttype', numeric: false, disablePadding: true, label: t('request.requesttype') },
            { id: 'priority', numeric: false, disablePadding: false, label: t('request.priority') },
            { id: 'status', numeric: true, disablePadding: false, label: t('request.status') }
          ]}
          rowsData={requestData}
          initialOrderProp={'patient'}
          rowsPerPage={10}
          onDelete={deleteRequests}
        />
      </Paper>
    </>
  );
};

export default Requests;
