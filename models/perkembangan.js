'use strict'
const { Model } = require('sequelize')
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
  }
  Perkembangan.init(
    {
      tanggal_pemeriksaan: DataTypes.DATE,
      lingkar_kepala: DataTypes.DECIMAL,
      tinggi: DataTypes.DECIMAL,
      berat_badan: DataTypes.DECIMAL,
      status_lingkar_kepala: DataTypes.INTEGER,
      status_tinggi: DataTypes.INTEGER,
      status_berat_badan: DataTypes.INTEGER,
      status_kasus: DataTypes.STRING,
      verify_date: DataTypes.DATE,
      status_verify: DataTypes.STRING,
      verifyById: DataTypes.INTEGER,
      BayiId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Perkembangan',
    }
  )
  return Perkembangan
}
