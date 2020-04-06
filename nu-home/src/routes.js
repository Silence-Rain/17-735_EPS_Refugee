import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Forum from './components/Forum';
import DirectMessage from './components/DirectMessage';
import RefugeeStatus from './components/RefugeeStatus';

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
      <Route path='/home' component={Index}>

      </Route>
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
    </Switch>
  )
}

export {
  ViewRouter, 
  MainRouter
};