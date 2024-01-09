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
        type: Sequelize.INTEGER,
      },
      maMauSac: {
        type: Sequelize.STRING,
      },
      maKichCo: {
        type: Sequelize.STRING,
      },
      maKhuyenMai: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      kichCo: {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("kichCo");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("kichCo", JSON.stringify(value));
        },
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
