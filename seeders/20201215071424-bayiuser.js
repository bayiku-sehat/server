'use strict'
const fs = require('fs')
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
    // const data = fs.readFileSync('./data/bayi.json','utf8')
    let data = require('../data/bayiuser')

    try {
      const results = await queryInterface.bulkInsert('BayiUsers', data, {})
      // console.log(results)
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
    await queryInterface.bulkDelete('BayiUsers', null, {})
  },
}
