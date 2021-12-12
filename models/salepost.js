"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class salepost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // define association here
        }
    }
    salepost.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                required: true,
            },
            userid: {
                type: DataTypes.INTEGER,
                require: true
            },
            title: {
                type: DataTypes.STRING,
                require: true
            },
            contents: {
                type: DataTypes.STRING,
                require: true
            },
            productImg: {
                type: DataTypes.STRING,
                require: true
            },
            productName: {
                type: DataTypes.STRING,
                require: true
            },
            price: {
                type: DataTypes.INTEGER,
                require: true
            },
            chatCnt: {
                type: DataTypes.INTEGER,
                require: false
            },
            commentCnt: {
                type: DataTypes.INTEGER,
                require: false
            },
            likeCnt: {
                type: DataTypes.INTEGER,
                require: false
            },
            lookCnt: {
                type: DataTypes.INTEGER,
                require: false
            }
        },
        {
            sequelize,
            modelName: "salepost",
        }
    );
    salepost.associate = function (models) {
        models.address.belongsTo(models.user, {
            foreignKey: 'userid', targetKey: 'id'
        });
        models.address.belongsTo(models.address, {
            foreignKey: 'userid', targetKey: 'id'
        });
    };
    return salepost;
};