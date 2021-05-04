import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { api } from '../../config';
import Users from '../Users';

const useStyles = makeStyles({
  root: {
    padding: 16,
    maxWidth: 1000,
    margin: '16px auto'
  },
  numberField: {
    minWidth: 200
  },
  textField: {
    minWidth: 500
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginRight: 10
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

const Administration = () => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const [lowFrequency, setLowFrequency] = useState('');
  const [highFrequency, setHighFrequency] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [mainDoctorName, setMainDoctorName] = useState('');

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    api
      .get(`/config/${process.env.REACT_APP_CONFIG_ID}`)
      .then((result) => {
        const config = result.data.data.doc;

        setLowFrequency(config.lowPriorityRequestsFrequency);
        setHighFrequency(config.highPriorityRequestsFrequency);
        setClinicName(config.clinicName);
        setMainDoctorName(config.mainDoctorName);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const saveChanges = async () => {
    try {
      const result = await api.patch(`/config/${process.env.REACT_APP_CONFIG_ID}`, {
        lowPriorityRequestsFrequency: lowFrequency,
        highPriorityRequestsFrequency: highFrequency,
        clinicName,
        mainDoctorName
      });

      if (result.data.status === 'success') {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const makeBackup = async () => {
    try {
      const result = await api.post('/config/make-backup');

      if (result.data.status === 'success') {
        alert('Backup is created!');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Paper className={classes.root}>
      <Box mb={'20px'}>
        <Typography variant={'h5'}>Administration</Typography>
        <hr />
      </Box>
      <AppBar position={'static'}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label={'patient tabs'}>
          <Tab label={'Clinic data'} />
          <Tab label={'Users'} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Box my={'10px'}>
          <Typography variant={'h6'}>Clinic data:</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} mb={'20px'}>
          <div className={classes.textContainer}>
            <TextField
              className={classes.numberField}
              value={lowFrequency}
              onChange={(e) => setLowFrequency(e.target.value)}
              placeholder={'Low priority request frequency'}
              label={'Low priority request frequency'}
              margin={'normal'}
              variant={'outlined'}
              color={'primary'}
              type={'number'}
              inputProps={{ min: 1 }}
            />
            <Box ml={'10px'}>minutes</Box>
          </div>
          <div className={classes.textContainer}>
            <TextField
              className={classes.numberField}
              value={highFrequency}
              onChange={(e) => setHighFrequency(e.target.value)}
              placeholder={'High priority request frequency'}
              label={'High priority request frequency'}
              margin={'normal'}
              variant={'outlined'}
              color={'primary'}
              type={'number'}
              inputProps={{ min: 1 }}
            />
            <Box ml={'10px'}>minutes</Box>
          </div>
          <TextField
            className={classes.textField}
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            placeholder={'Clinic name'}
            label={'Clinic name'}
            margin={'normal'}
            variant={'outlined'}
            color={'primary'}
          />
          <TextField
            className={classes.textField}
            value={mainDoctorName}
            onChange={(e) => setMainDoctorName(e.target.value)}
            placeholder={'Main doctor of clinic'}
            label={'Main doctor of clinic'}
            margin={'normal'}
            variant={'outlined'}
            color={'primary'}
          />
        </Box>
        <Button
          variant={'contained'}
          color={'primary'}
          className={classes.button}
          onClick={() => saveChanges()}
        >
          Save changes
        </Button>
        <Button variant={'contained'} color={'secondary'} onClick={() => makeBackup()}>
          Make backup of the system
        </Button>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Users />
      </TabPanel>
    </Paper>
  );
};

export default Administration;
