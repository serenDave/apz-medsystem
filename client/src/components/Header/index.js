import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, styled } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  title: {
    flex: 1
  }
});

const HeaderLink = styled(Link)({
  marginRight: 16
});

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => Boolean(state.user.token));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(actions.user.setToken(null));
    dispatch(actions.user.setUser(null));

    history.push('/login');
  };

  return (
    <AppBar position={'static'} className={classes.root}>
      <Toolbar>
        <Typography variant={'h6'} className={classes.title}>
          Medsystem
        </Typography>
        {isAuthed ? (
          <>
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
            <IconButton
              aria-label={'account of current user'}
              aria-controls={'menu-appbar'}
              aria-haspopup={true}
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My profile</MenuItem>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
          </>
        ) : (
          <Link to={'/login'}>
            <Button color={'inherit'}>{t('header.login')}</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
