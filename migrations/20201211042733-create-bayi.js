'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bayis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATE
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      lingkar_kepala: {
        type: Sequelize.DECIMAL
      },
      tinggi: {
        type: Sequelize.DECIMAL
      },
      berat_badan: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.STRING
      },
      OrangTua_Wali_id: {
        type: Sequelize.INTEGER
      },
      Petugas_id: {
        type: Sequelize.INTEGER
      },
      Dokter_id: {
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
    await queryInterface.dropTable('Bayis');
  }
};