"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("TaiKhoans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenDangNhap: {
        type: Sequelize.STRING,
      },
      matKhau: {
        type: Sequelize.STRING,
      },
      loaiTaiKhoan: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      cartId: {
        type: Sequelize.STRING,
      },
      infoPayment: {
        type: Sequelize.STRING,
      },
      danhSachYeuThich: {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("danhSachYeuThich");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("danhSachYeuThich", JSON.stringify(value));
        }
      },
      thongTinNhanHang: {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("thongTinNhanHang");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("thongTinNhanHang", JSON.stringify(value));
        }
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
    await queryInterface.dropTable("TaiKhoan");
  },
};
