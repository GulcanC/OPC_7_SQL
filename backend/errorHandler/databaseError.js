//  The first error we will be handling will be for invalid tokens which have status code 401.
// So, we check for an error response with status code 401 and return a new AppError.

const AppError = require("./AppError");

const handleInvalidTokenBCMS = () => {
  const message = "The authorization token is invalid";
  return new AppError(message, 401);
};
// exports the function that handles the error
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    console.log("ERROR: ", error);

    if (error?.response?.status === 401) {
      error = handleInvalidTokenBCMS();
    }

    productionError(error, res);
  }
};
