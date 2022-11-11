// The global error middleware determines how the application will oversee production and development errors.
// handles productional error
const productionError = (err, res) => {
  // operational error: send message to client about the error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Sends a generic message to the client about the error
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Handles development error
// sends back the error message, and additional information about the error
const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
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
    productionError(error, res);
  }
};
