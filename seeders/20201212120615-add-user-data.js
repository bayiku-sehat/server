'use strict'
const fs = require('fs')
import { User } from '../models'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // const data = fs.readFileSync('./data/user.json','utf8')
    // await queryInterface.bulkInsert('Users',JSON.parse(data), {})
    let data = require('../data/user')
    data.forEach((item) => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    })
    // await queryInterface.bulkInsert('Users', data, {})
    try {
      const users = await User.bulkCreate(users)
      console.log(users)
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
