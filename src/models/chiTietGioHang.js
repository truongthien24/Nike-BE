"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChiTietGioHang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChiTietGioHang.init(
    {
      soLuong: {
        type: DataTypes.INTEGER,
      },
      idCart: { 
        type: DataTypes.INTEGER
      },
      idSanPham: {
        type: DataTypes.INTEGER
      },
      thanhTien: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "ChiTietGioHang",
    }
  );
  return ChiTietGioHang;
};
