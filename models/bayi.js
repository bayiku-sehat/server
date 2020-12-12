'use strict';
const {BeratBadan} = require('./')
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
      Bayi.belongsTo(models.Dokter, {
        targetKey: 'id',
        foreignKey: 'Dokter_id'
      })
      Bayi.belongsTo(models.Orangtua_Wali, {
        targetKey: 'id',
        foreignKey: 'OrangTua_Wali_id'
      })
      Bayi.hasMany(models.Perkembangan, {
        sourceKey: 'id',
        foreignKey: 'Bayi_id'
      })
    }
  };
  Bayi.init({
    nama: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.STRING,
    lingkar_kepala: DataTypes.DECIMAL,
    tinggi: DataTypes.DECIMAL,
    berat_badan: DataTypes.DECIMAL,
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