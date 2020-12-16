"use strict";
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

const authentication = (req, res, next) => {
  console.log("masuk auth");
  const decoded = verifyToken(req.headers.access_token);
  console.log(decoded, "decoded");
  User.findOne({
    where: {
      username: decoded.username,
    },
  })
    .then(data => {
      console.log("sukses then");
      req.userData = data;
      next();
    })
    .catch(error => {
      console.log("err catch");
      next(error);
    });
};

module.exports = authentication;
