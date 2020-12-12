'use strict';
const { BeratBadan } = require('./')
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
    nama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please input the Date`
        }
      }
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please input the field`
        }
      }
    }, 
    lingkar_kepala: {
      type: DataTypes.DECIMAL,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    tinggi: {
      type: DataTypes.DECIMAL,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    berat_badan: {
      type: DataTypes.DECIMAL,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    }, 
    OrangTua_Wali_id: {
      type: DataTypes.INTEGER,
    },
    Petugas_id: {
      type: DataTypes.INTEGER,
    },
    Dokter_id: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Bayi',
  });
  return Bayi;
};