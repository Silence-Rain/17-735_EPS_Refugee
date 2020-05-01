import { returnError, clearError } from './errorAction';
import api from "../../api"

// Action creator for loading user profile
// Note that CSRF token is attached after logged-in
// Dispatch the corresponding events to reducer, reducer will update the store accordingly
export const loadUser = () => (dispatch, getState) => {
  dispatch(clearError());
  return api.get("/get_user_profile/", {
    headers: {
      'X-CSRFToken': getState().auth.token
    }
  })
    .then(res => {
      let temp_res = res.data.res
      temp_res["isVerified"] = res.data.res.verification_status
      dispatch({
        type: "LOAD_SUCCESS",
        payload: temp_res
      });
    })
    .catch(err => {
      dispatch(returnError("Load profile failed", 500));
    })
}

// Action creator for login
// Dispatch the corresponding events to reducer, reducer will update the store accordingly
export const login = ({ 
  username, 
  password 
}) => dispatch => {
  dispatch(clearError());
  return api.post('/login/', {
      username,
      password
    })
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

// Action creator for logout
// Note that CSRF token is attached after logged-in
// Dispatch the corresponding events to reducer, reducer will update the store accordingly
export const logout = () => (dispatch, getState) => {
  dispatch(clearError());
  return api.post("/logout/", {}, {
    headers: {
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

// Action creator for registration
// Dispatch the corresponding events to reducer, reducer will update the store accordingly
export const register = ({
  username,
  password,
  region
}) => dispatch => {
  dispatch(clearError());
  return api.post('/registration/', {
      username,
      password,
      region
    })
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
