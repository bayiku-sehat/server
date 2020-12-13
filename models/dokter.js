'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dokter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dokter.belongsToMany(models.Bayi, {
        through: models.Pasien,
        targetKey: 'id',
        foreignKey: "Dokter_id"
      })
    }
  };
  Dokter.init({
<<<<<<< HEAD
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
    spesialisasi: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the field`
        }
      }
    },
=======
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    usia: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    spesialisasi: DataTypes.STRING,
    Bayi_id: DataTypes.INTEGER
>>>>>>> b38d4b45ea0b1d24dbd6dca63ed9efb760683982
  }, {
    sequelize,
    modelName: 'Dokter',
  });
  return Dokter;
};