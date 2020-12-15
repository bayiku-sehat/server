'use strict';
const {
  Model
} = require('sequelize');
const { makeHash } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Bayi, {through: models.BayiUser})
    }
  };
  User.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    usia: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    role: DataTypes.STRING,
    alamat_puskesmas: DataTypes.STRING,
    foto: DataTypes.STRING
  }, { hooks: {
    beforeCreate (user) {
      user.password = makeHash(user.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};