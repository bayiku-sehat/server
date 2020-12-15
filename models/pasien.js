'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pasien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pasien.belongsTo(models.Bayi, {
        targetKey: 'id',
        foreignKey: 'Bayi_id'
      })
      Pasien.belongsTo(models.Dokter, {
        targetKey: 'id',
        foreignKey: 'Dokter_id'
      })
    }
  };
  Pasien.init({
    status: DataTypes.STRING,
    Bayi_id: DataTypes.INTEGER,
    Dokter_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pasien',
  });
  return Pasien;
};