'use strict'

const jsonwebtoken = require('jsonwebtoken')

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, process.env.SECRET || 'rahasia')
  return token
}

function verifyToken(token) {
  const decoded = jsonwebtoken.verify(token, process.env.SECRET || 'rahasia')
  return decoded
}

module.exports = {
  signToken,
  verifyToken
}