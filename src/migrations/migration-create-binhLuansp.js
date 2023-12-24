"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BinhLuans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noiDung: {
        type: Sequelize.STRING,
      },
      diemDanhGia: {
        type: Sequelize.INTEGER,
      },
      idDanhGiaParent: {
        type: Sequelize.INTEGER,
      },
      ngayTao: {
        type: Sequelize.TEXT,
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      idSanPham: {
        type: Sequelize.INTEGER
      },
      danhSachTraLoi: {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
            const rawValue = this.getDataValue("danhSachTraLoi");
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue("danhSachTraLoi", JSON.stringify(value));
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
    await queryInterface.dropTable("BinhLuans");
  },
};
