import axios from 'axios';
import { returnError, clearError } from './errorAction';
//import api from "../../api.js"

const options = {
  baseURL: 'http://localhost/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

export const login = ({ 
  username, 
  password 
}) => dispatch => {
  dispatch(clearError());
  return axios.post('login/', {
      username,
      password
    }, options)
    .then(res => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.res
      });
    })
    .catch(err => {
      dispatch(returnError(String(err), 401));
      dispatch({
        type: "LOGIN_FAILED"
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch(clearError());
  return axios.post("logout/", {}, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getState().auth.token
    }
  })
    .then(res => {
      dispatch({
        type: "LOGOUT_SUCCESS"
      });
    })
    .catch(err => {
      dispatch(returnError("Logout failed", 500));
    })
};

export const register = ({
  username,
  password,
  region
}) => dispatch => {
  return axios.post('registration/', {
      username,
      password,
      region
    }, options)
    .then(res => {
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data.res
      });
    })
    .catch(err => {
      dispatch(returnError(String(err), 400));
      dispatch({
        type: "REGISTER_FAILED"
      });
    });
};

// /**
//  * A common utility function for setting the authentication header
//  * Since each requests other than login and register needs authentication,
//  * this function sets the "Authorization" header to the JWT value stored in
//  * the auth state
//  * @param {*} getState
//  */
// export const authTokenConfig = getState => {
//   // Get token from localstorage
//   const token = getState().auth.token;
//   // Headers
//   const config = {
//     headers: {
//       'Content-type': 'application/json'
//     }
//   };

//   // If jwt token presented, add to headers
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }

//   return config;
// };
