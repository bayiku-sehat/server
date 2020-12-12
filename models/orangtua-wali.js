'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orangtua_Wali extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orangtua_Wali.hasMany(models.Bayi, {
        sourceKey: 'id',
        foreignKey: 'OrangTua_Wali_id'
        
      })
    }
  };
  Orangtua_Wali.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    usia: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_hp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orangtua_Wali',
  });
  return Orangtua_Wali;
};