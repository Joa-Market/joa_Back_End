"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("salepost", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            contents: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            productImg: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            chatCnt: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            commentCnt: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            likeCnt: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            lookCnt: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("salepost");
    },
};