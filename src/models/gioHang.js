"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GioHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GioHang.init(
    {
      maTaiKhoan: DataTypes.STRING,
      maDonDatDang: DataTypes.STRING, 
    },
    {
      sequelize,
      modelName: "GioHang",
    }
  );
  return GioHang;
};
