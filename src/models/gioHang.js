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
      // this.belongsTo(models.TaiKhoan);
      // this.belongsToMany(models.SanPham, {through: models.ChiTietGioHang});
    }
  }
  GioHang.init(
    {
      tongGia: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GioHang",
    }
  );
  return GioHang;
};
