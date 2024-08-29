// errorHandlerMiddleware.js
const errorHandlerMiddleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Caught an exception!', error);
    // Optionally, dispatch an error action
    // store.dispatch({
    //   type: 'error/occurred',
    //   payload: error.message || 'An error occurred'
    // });
    // throw error; // Optional: rethrow the error if needed
  }
};

export default errorHandlerMiddleware;
