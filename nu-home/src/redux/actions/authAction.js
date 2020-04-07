import axios from 'axios';
import { returnError } from './errorAction';

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};

export const login = ({ username, password }) => dispatch => {
  // The login body, "loginRequest" in the backend
  // const body = JSON.stringify({
  //   email,
  //   password
  // });

  setTimeout(() => {
    const payload = {
      username: 'Silence',
      type: 'admin',
      isVerified: true,
      avatar: 1,
      bio: "Hello"
    };
    dispatch({
      type: "LOGIN_SUCCESS",
      payload
    });
  }, 1000);

  // submit a post request to '/api/auth/login'
  // axios
  //   .post('/api/auth/login', body, config)
  //   .then(res => {
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data
  //     });
  //     // return the res promise in case any other place needs it
  //     dispatch(push('/'));
  //     return res;
  //   })
  //   .catch(err => {
  //     dispatch(
  //       returnErrors(
  //         err.response.data.message,
  //         err.response.status,
  //         'LOGIN_FAIL'
  //       )
  //     );
  //     dispatch({
  //       type: LOGIN_FAIL
  //     });
  //   });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: "LOGOUT_SUCCESS"
  });
};

export const register = ({
  username,
  password,
  origin,
  region
}) => dispatch => {
  // // Request body
  // const body = JSON.stringify({
  // });

  setTimeout(() => {
    const payload = {
      username: 'Silence',
      type: 'admin',
      isVerified: true,
      avatar: 1,
      bio: "Hello"
    };
    dispatch({
      type: "REGISTER_SUCCESS",
      payload
    });
  }, 1000);

  // // post the registration details to the backend
  // axios
  //   .post('/api/auth/register', body, config)
  //   .then(res => {
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data
  //     });
  //     // redirect user to the home page after successful registration
  //     dispatch(push('/'));
  //   })
  //   .catch(err => {
  //     dispatch(
  //       returnErrors(
  //         err.response.data.message,
  //         err.response.status,
  //         'REGISTER_FAIL'
  //       )
  //     );
  //     dispatch({
  //       type: REGISTER_FAIL
  //     });
  //   });
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
