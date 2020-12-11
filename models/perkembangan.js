'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perkembangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Perkembangan.init({
    catatan: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tanggal_pemeriksaan: DataTypes.DATE,
    lingkar_kepala: DataTypes.INTEGER,
    tinggi: DataTypes.INTEGER,
    berat_badan: DataTypes.INTEGER,
    status: DataTypes.STRING,
    Bayi_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Perkembangan',
  });
  return Perkembangan;
};