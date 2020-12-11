'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bayi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bayi.init({
    nama: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    lingkar_kepala: DataTypes.INTEGER,
    tinggi: DataTypes.INTEGER,
    berat_badan: DataTypes.INTEGER,
    status: DataTypes.STRING,
    OrangTua_Wali_id: DataTypes.INTEGER,
    Petugas_id: DataTypes.INTEGER,
    Dokter_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bayi',
  });
  return Bayi;
};