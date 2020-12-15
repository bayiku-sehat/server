"use strict";

function errorHandler(err, req, res, next) {
  let message = err.message || "Internal Server Error";
  let statusCode = err.respone || 500;
  console.log(statusCode);

  console.log(err, "klklklk");

  if (err.name === "Unauthorized") {
    message = err.message;
    statusCode = 401;
  } else if (err.name === "Bad Request") {
    message = err.message;
    statusCode = 400;
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "field must be not empty";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    console.log("lolooo");
    message = "user already exists";
    console.log(err.message);
    statusCode = 400;
  } else if (err.name === "JsonWebTokenError") {
    message = err.message + "user unauthenticated";
    statusCode = 401;
  }
  res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;
