'use strict'

function errorHandler(err, req, res, next) {
  let message = err.message || 'Internal Server Error'
  let statusCode = err.response || 500
  let errors = []

  if (err.name === "Unauthorized") {
    message = err.message
    statusCode = 401
  }

  else if (err.name === "Bad Request") {
    message = err.message
    statusCode = 400
  }

  else if (err.name === "SequelizeValidateError") {
    message = err.errors.map(element => {
      errors.push(element.message)
    })
    statusCode = 400
  }

  else if (err.name === "SequelizeUniqueConstraintError") {
    message = err.message + ", email already used"
  }

  else if (err.name === "JsonWebTokenError") {
    message = err.message + "user unauthenticated"
    statusCode = 401
  }

  console.log(err);
  res.status(statusCode).json({errors})
}

module.exports = errorHandler