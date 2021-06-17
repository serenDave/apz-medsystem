import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Table, RegisterForm } from '../../components';
import { api } from '../../config';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    padding: 16,
    margin: '16px auto',
    maxWidth: 1200
  }
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const a11yProps = (index) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`
});

const Patients = ({ history }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [patientsData, setPatientsData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    api.get('/patients').then((result) => {
      if (result.data.status === 'success') {
        const data = result.data.data.docs.map((patient) => ({
          id: patient._id,
          firstname: patient.fullName.split(' ')[0],
          lastname: patient.fullName.split(' ')[1],
          deliveryreason: patient.deliveryReason.name,
          ward: patient.wardId.number,
          pulse: patient.pulse,
          temperature: patient.temperature,
          bloodpressure: `${patient.bloodPressure.systolic} / ${patient.bloodPressure.diastolic}`
        }));

        setPatientsData(data);
      }
    });
  }, [reload]);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const deletePatients = async (selected) => {
    const result = await api.post('/patients/delete-many', { ids: selected });

    if (result.status === 204) {
      setReload(reload + 1);
    }
  };

  return (
    <Paper className={classes.root}>
      <AppBar position={'static'}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label={'patient tabs'}>
          <Tab label={t('patients.data')} {...a11yProps(0)} />
          <Tab label={t('patients.create')} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Table
          header={t('patients.title')}
          headCells={[
            { id: 'firstname', label: t('patients.firstname') },
            { id: 'lastname', label: t('patients.lastname') },
            { id: 'deliveryreason', label: t('patients.deliveryreason') },
            { id: 'ward', label: t('patients.ward') },
            { id: 'pulse', label: t('patients.pulse') },
            { id: 'temperature', label: t('patients.temperature') },
            { id: 'bloodpressure', label: t('patients.pressure') }
          ]}
          rowsData={patientsData}
          onRowClick={(row) => {
            history.push(`/patientinfo/${row.id}`);
          }}
          onDelete={deletePatients}
          initialOrderProp={'firstname'}
          rowsPerPage={15}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RegisterForm />
      </TabPanel>
    </Paper>
  );
};

export default Patients;
