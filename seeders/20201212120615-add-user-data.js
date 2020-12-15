'use strict'

const fs = require('fs')
const { User } = require('../models')

let data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))

data.forEach((item) => {
  item.createdAt = new Date()
  item.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('Users', data, {})
    try {
      const user = await User.bulkCreate(data)
      console.log('user:', user)
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
}
