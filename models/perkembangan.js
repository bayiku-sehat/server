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
    tanggal_pemeriksaan: DataTypes.DATE,
    lingkar_kepala: DataTypes.DECIMAL,
    tinggi: DataTypes.DECIMAL,
    berat_badan: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    Bayi_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Perkembangan',
  });
  return Perkembangan;
};