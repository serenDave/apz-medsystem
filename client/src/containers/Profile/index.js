import React from 'react';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    padding: 16,
    maxWidth: 1000,
    margin: '16px auto'
  },
  text: {
    marginBottom: 12
  },
  textInfo: {
    fontWeight: 400
  }
});

const Profile = () => {
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(actions.user.setToken(null));
    dispatch(actions.user.setUser(null));

    history.push('/login');
  };

  return (
    <Paper className={classes.root}>
      <Box mb={'20px'}>
        <Typography variant={'h4'}>Profile Info</Typography>
      </Box>
      <Typography variant={'h6'} className={classes.text}>
        Username: <span className={classes.textInfo}>{user.name}</span>
      </Typography>
      <Typography variant={'h6'} className={classes.text}>
        Email: <span className={classes.textInfo}>{user.email}</span>
      </Typography>
      <Typography variant={'h6'} className={classes.text}>
        Role: <span className={classes.textInfo}>{user.role}</span>
      </Typography>
      <Box mt={'20px'}>
        <Button variant={'contained'} color={'primary'} onClick={() => logout()}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;
