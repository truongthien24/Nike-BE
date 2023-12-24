"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("TaiKhoans", "thongTinNhanHang", {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("thongTinNhanHang");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("thongTinNhanHang", JSON.stringify(value));
        },
        after: "infoPayment",
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("TaiKhoans", "thongTinNhanHang");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
