'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LingkarKepala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LingkarKepala.init({
    bulan: DataTypes.INTEGER,
    sd_n3: DataTypes.DECIMAL,
    sd_n2: DataTypes.DECIMAL,
    sd_n1: DataTypes.DECIMAL,
    median: DataTypes.DECIMAL,
    sd_1: DataTypes.DECIMAL,
    sd_2: DataTypes.DECIMAL,
    sd_3: DataTypes.DECIMAL,
    jenisKelamin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LingkarKepala',
  });
  return LingkarKepala;
};