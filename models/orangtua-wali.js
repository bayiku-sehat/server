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
    nama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    usia: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Username must not empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password must not empty`
        }
      }
    },
    no_hp: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Orangtua_Wali',
  });
  return Orangtua_Wali;
};