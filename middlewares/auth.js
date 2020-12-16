'use strict'
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

const authentication = (req, res, next) => {
  const decoded = verifyToken(req.headers.access_token)
  User.findOne({
    where: {
      username: decoded.username,
    },
    include: ['Bayis'],
  })
    .then((data) => {
      req.userData = data
      next()
    })
    .catch((error) => {
      next(error)
    })
}

module.exports = authentication
