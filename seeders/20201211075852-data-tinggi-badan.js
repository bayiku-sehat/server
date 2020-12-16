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
    class TinggiBadan {
      constructor(
        bulan,
        sd_n3,
        sd_n2,
        sd_n1,
        median,
        sd_1,
        sd_2,
        sd_3,
        jenisKelamin
      ) {
        ;(this.bulan = bulan),
          (this.sd_n3 = sd_n3),
          (this.sd_n2 = sd_n2),
          (this.sd_n1 = sd_n1),
          (this.median = median),
          (this.sd_1 = sd_1),
          (this.sd_2 = sd_2),
          (this.sd_3 = sd_3),
          (this.jenisKelamin = jenisKelamin)
      }
    }
    let dataTinggiBadan = []
    const tinggiBadan = fs
      .readFileSync('./data-who/tinggi-badan.csv', { encoding: 'utf8' })
      .split('\r\n')
    tinggiBadan.forEach((el) => {
      const perBayi = el.split(';')
      const newInstance = new TinggiBadan(
        +perBayi[0],
        +perBayi[1],
        +perBayi[2],
        +perBayi[3],
        +perBayi[4],
        +perBayi[5],
        +perBayi[6],
        +perBayi[7],
        perBayi[8]
      )
      dataTinggiBadan.push(newInstance)
    })
    dataTinggiBadan.map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('TinggiBadans', dataTinggiBadan, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TinggiBadans', null, {})
  },
}
