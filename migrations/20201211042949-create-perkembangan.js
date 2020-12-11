'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Perkembangans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catatan: {
        type: Sequelize.STRING
      },
      tanggal_pemeriksaan: {
        type: Sequelize.DATE
      },
      lingkar_kepala: {
        type: Sequelize.INTEGER
      },
      tinggi: {
        type: Sequelize.INTEGER
      },
      berat_badan: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      Bayi_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Perkembangans');
  }
};