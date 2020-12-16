"use strict";

function errorHandler(err, req, res, next) {
  let message = err.message || "Internal Server Error";
  let statusCode = err.respone || 500;
  console.log(statusCode);

  console.log(err.name, "Nama error");

  if (err.name === "Unauthorized") {
    message = err.message;
    statusCode = err.status;
  } else if (err.name === "Bad Request") {
    console.log("ada disini");
    message = err.message;
    statusCode = err.status;
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "field must be not empty";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    message = "user already exists";
    console.log(err, "error");
    console.log(err.message);
    statusCode = 400;
  } else if (err.name === "JsonWebTokenError") {
    message = err.message + "user unauthenticated";
    console.log(message, "401");
    statusCode = 401;
  }
  res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;
