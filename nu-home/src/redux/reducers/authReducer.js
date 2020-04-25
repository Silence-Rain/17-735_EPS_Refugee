import Cookies from 'js-cookie';

const initialState = {
  token: null,
  user: {
    username: null,
    user_type: null,
    isVerified: false
  },
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    // When login/register succeed, 
    // mark the user as "isAuthenticated" and store the user profile and the CSRF token for following requests
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "LOAD_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: Cookies.get("csrftoken"),
      };
    // When logout succeed or failed to login/register, 
    // Clear all cookies and restore the states
    case "LOGIN_FAILED":
    case "REGISTER_FAILED":
    case "LOGOUT_SUCCESS":
      Cookies.remove('csrftoken');
      Cookies.remove('sessionid');
      return {
        ...state,
        token: null,
        user: {
          username: null,
          user_type: null,
          isVerified: false
        },
        isAuthenticated: false
      };
    default:
      return state;
  }
}
