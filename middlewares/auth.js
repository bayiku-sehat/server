'use strict'
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
  try {
    const decoded = verifyToken(req.headers.access_token)
    const data = await User.findOne({
      where: {
        username: decoded.username,
      },
      include: ['Bayis'],
    })
    req.userData = data
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication
