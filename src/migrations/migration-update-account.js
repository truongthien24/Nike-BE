"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("TaiKhoans", "danhSachYeuThich", {
        type: Sequelize.JSON,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("danhSachYeuThich");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("danhSachYeuThich", JSON.stringify(value));
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
      await queryInterface.removeColumn("TaiKhoans", "danhSachYeuThich");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
