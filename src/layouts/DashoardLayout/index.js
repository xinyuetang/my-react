import React, { useEffect, useState } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { getUserInfo } from 'src/service/userService';
import { RouteWithSubRoutes } from "src/routerGuard";
// import SockJsClient from 'react-stomp';
import { UserContext } from '../Context'
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
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({ userId: 0 });
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    getUserInfo().then(res => {
      if (res?.success) {
        setUser(res?.data)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (user.userId === 0) return null
  return (
    <UserContext.Provider value={{ userInfo: user }}>
      <div className={classes.root}>
        {/* <SockJsClient url={BASE_URL+'/ws'} topics={['/topic/bulletin']}
              onMessage={()=>{window.alert(" 您有一条新的通知！");}}
        /> */}
        
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
    </UserContext.Provider>
  );
};

export default DashboardLayout;
