"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SanPhams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      maSanPham: {
        type: Sequelize.STRING,
      },
      maThuongHieu: {
        type: Sequelize.STRING,
      },
      maMauSac: {
        type: Sequelize.STRING,
      },
      maKichCo: {
        type: Sequelize.STRING,
      },
      maKhuyenMai: {
        type: Sequelize.STRING,
      },
      hinhAnh: {
        type: Sequelize.STRING,
      },
      tenSanPham: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      giaSanPham: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      soLuong: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      moTa: {
        type: Sequelize.STRING,
      },
      noiDung: {
        type: Sequelize.STRING,
      },
      trangThai: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("SanPhams");
  },
};
