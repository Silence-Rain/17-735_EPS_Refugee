export const returnError = (msg, status) => {
  return {
    type: "SET_ERROR",
    payload: {
      msg,
      status
    }
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  };
};
