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
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        token: Cookies.get("csrftoken"),
      };
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
