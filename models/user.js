"use strict";
const { Model } = require("sequelize");
const { makeHash } = require("../helpers/hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Bayi, { through: models.BayiUser });
    }
  }
  User.init(
    {
      nama: {
        type: DataTypes.STRING,
      notEmpty: true
    },
      alamat: DataTypes.STRING,
      usia:{
        type: DataTypes.INTEGER,
        notNull: true
      },
      jenis_kelamin: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot be empty",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be empty",
          },
          notEmpty: {
            msg: "password cannot be empty",
          },
        },
      },
      no_hp: DataTypes.INTEGER,
      role: DataTypes.STRING,
      alamat_puskesmas: DataTypes.STRING,
      foto: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = makeHash(user.password);
        },
        // beforeValidate(user) {
        //   user.password = makeHash(user.password);
        // },
        beforeUpdate(user) {
          user.password = makeHash(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  User.beforeBulkCreate((users) => {
    users.map((user) => {
      let hash = makeHash(user.password)
      user.password = hash
      user.username = user.username.toLowerCase()
      if (!user.foto) {
        user.foto = `https://avatars.dicebear.com/api/initials/${user.username}.svg`;
      }
    });
  });

  User.beforeFind(options => {
    if (options.where && options.where.username) {
      options.where.username = options.where.username.toLowerCase();
    }
  });
  return User;
};
