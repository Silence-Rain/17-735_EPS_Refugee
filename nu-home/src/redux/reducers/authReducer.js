import Cookies from 'js-cookie';

const initialState = {
  token: null,
  user: null,
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
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT_SUCCESS":
      Cookies.remove('csrftoken');
      Cookies.remove('sessionid');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
