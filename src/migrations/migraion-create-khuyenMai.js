"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("KhuyenMais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      maKhuyenMai: {
        type: Sequelize.TEXT,
      },
      tenKhuyenMai: {
        type: Sequelize.TEXT,
      },
      loaiKhuyenMai: {
        type: Sequelize.INTEGER,
      },
      phanTramKhuyenMai: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("KhuyenMais");
  },
};
