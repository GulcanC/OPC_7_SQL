// https://stackoverflow.com/questions/62836633/how-to-set-error-name-in-extended-class-error-in-node-js

class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;

/* const {validationResult} = require('express-validator');

exports.signup = (req, res, next) => {     
    const errors = validationResult(req); 
   
      if (!errors.isEmpty()) {
        let err = new AppError(`Invalid login credentials.`, 422);
        err.name = 'ExpressValidatorError';            
             
        return next(err);
      }

    res.status(200).send(req.user);          
} */
