'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TinggiBadans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bulan: {
        type: Sequelize.INTEGER
      },
      sd_n3: {
        type: Sequelize.DECIMAL
      },
      sd_n2: {
        type: Sequelize.DECIMAL
      },
      sd_n1: {
        type: Sequelize.DECIMAL
      },
      median: {
        type: Sequelize.DECIMAL
      },
      sd_1: {
        type: Sequelize.DECIMAL
      },
      sd_2: {
        type: Sequelize.DECIMAL
      },
      sd_3: {
        type: Sequelize.DECIMAL
      },
      jenisKelamin: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TinggiBadans');
  }
};