const errorHandler = (state) => (next) => (action) => {
  if (action.type === "error") console.log(action.payload.message);
  else next(action);
};

export default errorHandler;
