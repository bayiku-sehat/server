'use strict'
const bcrypt = require('bcrypt')

function makeHash(payload) {
  return bcrypt.hashSync(payload, 10)
}

function compareHash(payload, hashed) {
  return bcrypt.compareSync(payload, hashed)
}

module.exports = {
  makeHash,
  compareHash
}