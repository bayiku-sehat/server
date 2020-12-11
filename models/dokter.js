'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dokter.hasMany(models.Bayi, {
        sourceKey: 'id',
        foreignKey: 'Dokter_id'
      })
    }
  };
  Dokter.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    usia: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    spesialisasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dokter',
  });
  return Dokter;
};