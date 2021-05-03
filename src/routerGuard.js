// routerGuard.jsx
import React from "react"
import { Route, Redirect } from "react-router-dom"
import cookie from 'react-cookies';

const checkLoginStatus = () => {
    if(cookie.load("loggedIn")==null) return false;
    return true;
}

export function RouteWithSubRoutes(route) {
    if(route.auth && checkLoginStatus()==false)
    {
        console.log("请先登录")
        return <Redirect to="/login"/>
    }
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component  {...props}  routes={route.routes} />
        )}
      />
    );
  }
