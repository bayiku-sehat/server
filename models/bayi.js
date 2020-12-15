'use strict'
const { BeratBadan } = require('./')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bayi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Bayi.belongsToMany(models.User, { through: models.BayiUser })
      Bayi.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'verifyById',
      })
      Bayi.hasMany(models.Perkembangan, {
        sourceKey: 'id',
        foreignKey: 'BayiId',
      })
    }
  }
  Bayi.init(
    {
      nama: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            mgs: 'nama tidak boleh kosong',
          },
        },
      },
      tanggal_lahir: DataTypes.DATE,
      jenis_kelamin: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'jenis kelamin tidak boleh kosong',
          },
        },
      },
      foto: DataTypes.STRING,
      lingkar_kepala: {
        type: DataTypes.DECIMAL,
        notNull: true
      },
      tinggi: {
        type: DataTypes.DECIMAL,
        notNull: true
      },
      berat_badan: {
        type: DataTypes.DECIMAL,
        notNull: true
      },
      status_lingkar_kepala: DataTypes.INTEGER,
      status_tinggi: DataTypes.INTEGER,
      status_berat_badan: DataTypes.INTEGER,
      status_kasus: DataTypes.STRING,
      verify_date: DataTypes.DATE,
      status_verify: DataTypes.STRING,
      verifyById: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Bayi',
    }
  )
  return Bayi
}
