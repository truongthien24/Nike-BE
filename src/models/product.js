"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SanPham.init(
    {
      maSanPham: DataTypes.STRING,
      maThuongHieu: DataTypes.STRING,
      maMauSac: DataTypes.STRING,
      maKichCo: DataTypes.STRING,
      maKhuyenMai: DataTypes.STRING,
      hinhAnh: DataTypes.STRING,
      tenSanPham: DataTypes.STRING,
      giaSanPham: DataTypes.INTEGER,
      soLuong: DataTypes.INTEGER,
      moTa: DataTypes.TEXT,
      noiDung: DataTypes.TEXT,
      trangThai: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SanPham",
    }
  );
  return SanPham;
};
