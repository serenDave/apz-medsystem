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
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => Boolean(state.user.token));
  const user = useSelector((state) => state.user.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [language, setLanguage] = React.useState('en');

  const changeLanguage = () => {
    const nextLanguage = language === 'en' ? 'ua' : 'en';
    setLanguage(nextLanguage); 
    i18n.changeLanguage(nextLanguage);
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
            <HeaderLink to={'/patients'}>
              <Button color={'inherit'}>{t('header.patients')}</Button>
            </HeaderLink>
            <HeaderLink to={'/requests'}>
              <Button color={'inherit'}>{t('header.requests')}</Button>
            </HeaderLink>
            <HeaderLink to={'/doctors'}>
              <Button color={'inherit'}>{t('header.doctors')}</Button>
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
              {user.role === 'admin' && (
                <MenuItem onClick={handleClose}>
                  <Link to='/administration'>{t('header.administration')}</Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <Link to='/profile'>{t('header.myprofile')}</Link>
              </MenuItem>
              <MenuItem onClick={() => changeLanguage()}>
                {t('header.changelanguage')}
              </MenuItem>
              <MenuItem onClick={logout}>{t('header.logout')}</MenuItem>
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
