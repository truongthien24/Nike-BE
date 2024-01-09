"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("SanPhams", "kichCo", {
        type: Sequelize.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("kichCo");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("kichCo", JSON.stringify(value));
        },
      });
      await queryInterface.removeColumn("SanPhams", "maKichCo", {
        type: Sequelize.INTEGER,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("SanPhams", "kichCo");
      await queryInterface.addColumn("SanPhams", "maKichCo");
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
