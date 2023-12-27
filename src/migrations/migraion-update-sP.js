"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("SanPhams", "maThuongHieu", {
        type: Sequelize.INTEGER,
      });
      await queryInterface.changeColumn("SanPhams", "maKichCo", {
        type: Sequelize.INTEGER,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("SanPhams", "maThuongHieu");
      await queryInterface.changeColumn("SanPhams", "maKichCo", {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
