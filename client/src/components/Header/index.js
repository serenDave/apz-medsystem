import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  title: {
    flex: 1
  }
});

const HeaderLink = styled(Link)`
  margin-right: 16px;
`;

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <AppBar position={'static'} className={classes.root}>
      <Toolbar>
        <Typography variant={'h6'} className={classes.title}>
          Medsystem
        </Typography>
        <HeaderLink to={'/dashboard'}>
          <Button color={'inherit'}>{t('header.dashboard')}</Button>
        </HeaderLink>
        <HeaderLink to={'/patients'}>
          <Button color={'inherit'}>{t('header.patients')}</Button>
        </HeaderLink>
        <HeaderLink to={'/requests'}>
          <Button color={'inherit'}>{t('header.requests')}</Button>
        </HeaderLink>
        <HeaderLink to={'/doctors'}>
          <Button color={'inherit'}>{t('header.doctors')}</Button>
        </HeaderLink>
        <HeaderLink to={'/users'}>
          <Button color={'inherit'}>{t('header.users')}</Button>
        </HeaderLink>
        <Link to={'/login'}>
          <Button color={'inherit'}>{t('header.login')}</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
