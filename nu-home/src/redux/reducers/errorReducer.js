const initialState = {
  msg: null,
  status: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    case "CLEAR_ERROR":
      return {
        msg: null,
        status: null
      };
    default:
      return state;
  }
}
