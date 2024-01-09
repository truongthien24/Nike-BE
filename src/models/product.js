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
      // this.belongsTo(models.TaiKhoan);
      // this.belongsToMany(models.GioHang, { through: models.ChiTietGioHang });
    }
  }
  SanPham.init(
    {
      maSanPham: DataTypes.STRING,
      maThuongHieu: DataTypes.INTEGER,
      maMauSac: DataTypes.STRING,
      maKhuyenMai: DataTypes.STRING,
      hinhAnh: DataTypes.STRING,
      tenSanPham: DataTypes.STRING,
      giaSanPham: DataTypes.INTEGER,
      soLuong: DataTypes.INTEGER,
      moTa: DataTypes.TEXT,
      noiDung: DataTypes.TEXT,
      trangThai: DataTypes.INTEGER,
      kichCo: {
        type: DataTypes.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("kichCo");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("kichCo", JSON.stringify(value));
        }
      }
    },
    {
      sequelize,
      modelName: "SanPham",
    }
  );
  return SanPham;
};
