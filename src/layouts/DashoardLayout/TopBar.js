import React, { useEffect, useState } from 'react';
import { Link as RouterLink,useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import cookie from 'react-cookies';
import {GET_NEW_BULLETIN_NUMBER_URL} from 'src/settings';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  logo:{
    color:"white",
    fontSize: "larger"
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [newBulletinNumber,setNewBulletinBumber] = useState(0);//未读通知数量
  const logOut = ()=>{
    cookie.remove("userInfo",{ path: '/' });
    history.push('/login');
  }
 
  //向后台调取所有未读通知数
  const getAllBulletin = ()=>{
    return fetch(GET_NEW_BULLETIN_NUMBER_URL, {
      method: 'GET',
      mode: 'cors',
      // headers: new Headers({
      //     'token': cookie.load("userInfo").token
      // })
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      // .then(response => {console.log(response); setNewBulletinBumber(response.number);});
  }

  
  useEffect(getAllBulletin,[]);
  

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      
      <Toolbar>
        <RouterLink to="/">
        <Typography className={classes.logo}
          >
            复旦大学系统软件与安全实验室
          </Typography>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" component={RouterLink} to={"/app/bulletinList/"}>
            <Badge
              badgeContent={newBulletinNumber}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={logOut} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
