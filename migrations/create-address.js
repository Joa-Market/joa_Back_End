"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("address", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      road_address_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      x: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      y: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      userid:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("address");
  },
};