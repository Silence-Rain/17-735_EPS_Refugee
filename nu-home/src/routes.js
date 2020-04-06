import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import RegisterNGO from './components/RegisterNGO';
import Forum from './components/Forum';
import DirectMessage from './components/DirectMessage';
import RefugeeStatus from './components/RefugeeStatus';
import Settings from './components/Settings';

// let isAuthenticated = true

// let PrivateRoute = ({ children, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         props.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

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
      <Route exact path='/register_ngo' component={RegisterNGO} />
      <Route path='/home' component={Index} />
    </Switch>
  )
}

const ViewRouter = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`}>
        <Redirect 
          to={{
            pathname: `${props.match.path}/forum/important`
          }}
        />
      </Route>
      <Route exact path={`${props.match.path}/forum/:category`} component={Forum} />
      <Route exact path={`${props.match.path}/dm`} component={DirectMessage} />
      <Route exact path={`${props.match.path}/status`} component={RefugeeStatus} />
      <Route exact path={`${props.match.path}/settings`} component={Settings} />
    </Switch>
  )
}

export {
  ViewRouter, 
  MainRouter
};