// Action creator for returning new error message
export const returnError = (msg, status) => {
  return {
    type: "SET_ERROR",
    payload: {
      msg,
      status
    }
  };
};

// Action creator for clearing existing error message
export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  };
};
