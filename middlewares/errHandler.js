"use strict";

function errorHandler(err, req, res, next) {
  let message = err.message || "Internal Server Error";
  let statusCode = err.respone || 500;

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
    message = "user already exists";
    statusCode = 400;
  } else if (err.name === "JsonWebTokenError") {
    message = err.message + "user unauthenticated";
    statusCode = 401;
  } else if (err.name === "notDataPerkembaganBayi") {
    message = "Data perkembangan bayi tidak ditemukan."
    statusCode = 400
  } else if (err.name === "notDataBayi") {
    message = "Data bayi tidak ditemukan."
    statusCode = 400
  }else if (err.name === "notFound") {
      message = "Data tidak ditemukan."
      statusCode = 400
  } else if (err.name === "BadRequestAddBayi") {
    message = "Gagal menambah bayi."
    statusCode = 404
  } else if (err.name === "negativeValue") {
    message = "Tidak boleh negatif."
    statusCode = 404
  } else if (err.name === "notDokter") {
    message = "Anda tidak berhak menangani bayi."
    statusCode = 403
  }
  res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;
