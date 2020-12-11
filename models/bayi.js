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
      Bayi.belongsTo(models.Dokter, {
        targetKey: 'id',
        foreignKey: 'Dokter_id'
      })
      Bayi.belongsTo(models.OrangTua_Wali, {
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