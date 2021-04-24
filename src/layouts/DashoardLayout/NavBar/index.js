import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  Users as UsersIcon,
  Coffee as CoffeeIcon,
  Archive as ArchiveIcon,
  Server as ServerIcon,
  BookOpen as BookOpenIcon,
  MessageCircle as MessageCircleIcon
} from 'react-feather';

import cookie from 'react-cookies';
import NavItem from './NavItem';
 const userRoles = [ '系统管理员', '讨论班管理员', "Lab管理员", "推荐论文管理员"
  ,"培养方案管理员", "通知管理员","普通用户"]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
  });


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if(cookie.load("userInfo")!=null){
    setUser( {
      name: cookie.load("userInfo").name,
      id: cookie.load("userInfo").studentID,
      roleID:cookie.load("userInfo").roleID
    });
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.id}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
         {userRoles[user.roleID]}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          <NavItem
          href='/app/userManagement'
          title='权限管理'
          icon ={UsersIcon}
          isToOutLink={false}
          />
          
          <NavItem
          href='/app/seminar'
          title='演讲安排'
          icon ={CoffeeIcon}
          isToOutLink={false}
          />
          
          <NavItem
          href='/app/recorder'
          title='辅读安排'
          icon ={CoffeeIcon}
          isToOutLink={false}
          />

          {(user.roleID===2 || user.roleID===0) &&<NavItem
          href='http://10.176.36.7/'
          title='Lab 管理'
          icon ={ServerIcon}
          isToOutLink={true}
          />}

         <NavItem
          href='/app/essayRecommendation'
          title='推荐论文管理'
          icon ={ArchiveIcon}
          isToOutLink={false}
          />

         <NavItem
          href='/app/trainingScheme'
          title='培养方案管理'
          icon ={BookOpenIcon}
          isToOutLink={false}
          />
        
          {(user.roleID===5|| user.roleID===0) &&<NavItem
          href='/app/bulletinManagement'
          title='通知管理'
          icon ={MessageCircleIcon}
          isToOutLink={false}
          />}

          <NavItem
          href='/app/device'
          title='资源管理'
          icon ={SettingsIcon}
          isToOutLink={false}
          />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
