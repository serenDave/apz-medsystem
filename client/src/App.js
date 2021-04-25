import React, { useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { Dashboard, Login, Patients, Requests, Doctors, Users } from './containers';
import { Header } from './components';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from './redux/actions';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: '#eee'
  }
});

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  let isAuthed = false;

  const tryLogin = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/login');
    } else {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(actions.user.setUser(user));
        dispatch(actions.user.setToken(token));
        isAuthed = true;
      } catch (e) {
        history.push('/login');
      }
    }
  };

  useState(() => {
    tryLogin();
  }, []);

  let routes = (
    <>
      <Route exact path='/login' component={Login} />
      <Redirect to='/login' />
    </>
  );

  if (isAuthed) {
    routes = (
      <>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/patients' component={Patients} />
        <Route exact path='/requests' component={Requests} />
        <Route exact path='/doctors' component={Doctors} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/login' component={Login} />
        <Redirect to='/dashboard' />
      </>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Switch>{routes}</Switch>
    </div>
  );
};

export default App;
