"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DanhGias", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noiDung: {
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
    await queryInterface.dropTable("DanhGias");
  },
};
