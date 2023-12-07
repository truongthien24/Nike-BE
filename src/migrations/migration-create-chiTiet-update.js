"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("ChiTietGioHangs", "idGioHang", {
        type: Sequelize.INTEGER,
      });
      await queryInterface.addColumn("ChiTietGioHangs", "idSanPham", {
        type: Sequelize.INTEGER,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("ChiTietGioHangs", "idGioHang");
      await queryInterface.removeColumn("ChiTietGioHangs", "idSanPham");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
