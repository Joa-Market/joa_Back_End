"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      snslogin: {
        type: DataTypes.STRING,
        require: false,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
      nickName: {
        type: DataTypes.STRING,
      },
      salt: {
        type: DataTypes.STRING,
        require: true,
      },
      image: {
        type: DataTypes.STRING,
        require: false,
      }
    },

    {
      sequelize,
      modelName: "user",
    }
  );
  user.associate = function (models) {
    models.user.hasOne(models.address, {
      as: "address",
      foreignKey: "userid",
      sourceKey: "id",
    });
  };
  return user;
};