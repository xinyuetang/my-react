import React, { useState} from 'react';
import { Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { RouteWithSubRoutes } from "src/routerGuard";
import SockJsClient from 'react-stomp';
import {BASE_URL} from 'src/settings';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = ({ routes }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <SockJsClient url={BASE_URL+'/ws'} topics={['/topic/bulletin']}
            onMessage={()=>{window.alert(" 您有一条新的通知！");}}
       />
      
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />


    
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
          <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route}/>
          ))}
        </Switch>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default DashboardLayout;
