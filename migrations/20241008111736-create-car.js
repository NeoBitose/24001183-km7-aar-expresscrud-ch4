"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            model: {
                type: Sequelize.STRING,
            },
            plate: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            year: {
                type: Sequelize.INTEGER,
            },
            photoCar: {
                type: Sequelize.ARRAY(DataTypes.TEXT),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cars");
    },
};
