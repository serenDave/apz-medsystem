import { Box, Button, Container, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../config';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/actions';

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    padding: 16
  }
});

const Login = ({ history }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = async () => {
    const result = await api.post('/users/signin', {
      email,
      password
    });

    console.log(result);

    if (result.data.status === 'success') {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.data.user));
      dispatch(actions.user.setUser(result.data.data.user));
      dispatch(actions.user.setToken(result.data.token));

      history.push('/dashboard');
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth={'sm'}>
        <Paper className={classes.form}>
          <Box mb={'24px'}>
            <Typography align={'center'} variant={'h6'}>
              {t('login.title')}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <TextField
              label={t('login.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={'outlined'}
              helperText={t('login.helperEmail')}
              margin={'normal'}
              type={'email'}
            />
            <TextField
              label={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant={'outlined'}
              helperText={t('login.helperPassword')}
              margin={'normal'}
              type={'password'}
            />
            <Box mt={'24px'}>
              <Button variant={'contained'} color={'primary'} onClick={login}>
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
