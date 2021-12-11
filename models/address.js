"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        required: true,
      },
      address_name: {
        type: DataTypes.STRING,
        require: true,
      },
      road_address_name: {
        type: DataTypes.STRING,
        require: true,
      },
      x: {
        type: DataTypes.DOUBLE,
        require: true,
      },
      y: {
        type: DataTypes.DOUBLE,
        require: true,
      },
      userid:{
        type: DataTypes.INTEGER,
        require: true,
        references: {
          model: 'users',
          key: 'id',
        },
      }
    },
    {
      sequelize,
      modelName: "address",
      logging: false

    }
  );
  
  address.associate = function (models) {
    models.address.belongsTo(models.address, {
        foreignKey: 'userid', targetKey: 'id'
      });
  };
  return address;
};