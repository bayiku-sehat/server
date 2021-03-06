'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Perkembangans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tanggal_pemeriksaan: {
        type: Sequelize.DATE,
      },
      lingkar_kepala: {
        type: Sequelize.DECIMAL,
      },
      tinggi: {
        type: Sequelize.DECIMAL,
      },
      berat_badan: {
        type: Sequelize.DECIMAL,
      },
      status_lingkar_kepala: {
        type: Sequelize.INTEGER,
      },
      status_tinggi: {
        type: Sequelize.INTEGER,
      },
      status_berat_badan: {
        type: Sequelize.INTEGER,
      },
      status_kasus: {
        type: Sequelize.STRING,
      },
      status_verify: {
        type: Sequelize.STRING,
      },
      verify_date: {
        type: Sequelize.DATE,
      },
      verifyById: {
        type: Sequelize.INTEGER,
      },
      BayiId: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Perkembangans')
  },
}
