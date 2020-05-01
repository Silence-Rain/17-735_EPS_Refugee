import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import RegisterNGO from './components/RegisterNGO';
import Forum from './components/Forum';
import DirectMessage from './components/DirectMessage';
import RefugeeStatus from './components/RefugeeStatus';
import Settings from './components/Settings';
import store from './redux/store'

// Implementation of front-end router

// Definition of PrivateRoute
// Unauthorized accesses will be redirected to the login page
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.getState().auth.isAuthenticated ? children : (<Redirect to={"/login"}/>)
      }
    />
  );
}

// Definition of 404 route
// Returned when users trying to access non-existing urls
const NoMatch = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        404 Not Found: Invalid URL
      </h1>
    </div>
  );
}

// MainRouter for the App component
const MainRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect 
          to={{
            pathname: "/login"
          }}
        />
      </Route>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />    
      <PrivateRoute path='/home'>
        <Index />
      </PrivateRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  )
}

// ViewRouter for the Index component
// Change of URL only affect the right side of Index component, which means the menu and navigation bar will not be rendered again
const ViewRouter = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path={`${props.match.path}`}>
        <Redirect 
          to={{
            pathname: {
              "refugee": `${props.match.path}/dm/${store.getState().auth.user.assigned_ngo}`,
              "ngo_worker": `${props.match.path}/forum/important`,
              "ngo_admin": `${props.match.path}/register_ngo`
            }[store.getState().auth.user.user_type]
          }}
        />
      </PrivateRoute>
      <PrivateRoute path={`${props.match.path}/forum/:category`} component={Forum} />
      <PrivateRoute path={`${props.match.path}/dm/:user`} component={DirectMessage} />
      <PrivateRoute exact path={`${props.match.path}/status`} component={RefugeeStatus} />
      <PrivateRoute exact path={`${props.match.path}/settings`} component={Settings} />
      <PrivateRoute exact path={`${props.match.path}/register_ngo`} component={RegisterNGO} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  )
}

export {
  ViewRouter, 
  MainRouter
};