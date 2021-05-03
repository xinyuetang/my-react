import React, { useEffect, useContext } from 'react';
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
import { RoleName } from 'src/settings'
import NavItem from './NavItem';
import { UserContext } from 'src/layouts/Context'

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
  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
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
          {userInfo.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {userInfo.stuId}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
         {RoleName[userInfo.roleId]}
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

          {(userInfo.roleID===2 || userInfo.roleID===0) &&<NavItem
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
        
          {(userInfo.roleID===5|| userInfo.roleID===0) &&<NavItem
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
