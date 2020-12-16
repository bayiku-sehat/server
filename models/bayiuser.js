'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BayiUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     BayiUser.belongsTo(models.Bayi, {
       targetKey: 'id',
       foreignKey: 'BayiId'
     })
     BayiUser.belongsTo(models.User, {
       targetKey: 'id',
       foreignKey: 'UserId'
     })
    }
  };
  BayiUser.init({
    BayiId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { hooks: {
    beforeCreate (perkembangan) {
    perkembangan.status = 'Belum Tertangani'  
    }
  },
    sequelize,
    modelName: 'BayiUser',
  });
  return BayiUser;
};