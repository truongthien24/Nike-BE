"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.GioHang);
    }
  }
  TaiKhoan.init(
    {
      tenDangNhap: DataTypes.STRING,
      matKhau: DataTypes.STRING,
      email: DataTypes.STRING,
      cartId: DataTypes.STRING,
      infoPayment: DataTypes.STRING,
      loaiTaiKhoan: DataTypes.STRING,
      danhSachYeuThich: {
        type: DataTypes.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("danhSachYeuThich");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("danhSachYeuThich", JSON.stringify(value));
        }
      },
      thongTinNhanHang: {
        type: DataTypes.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("thongTinNhanHang");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("thongTinNhanHang", JSON.stringify(value));
        }
      }

    },
    {
      sequelize,
      modelName: "TaiKhoan",
    }
  );
  return TaiKhoan;
};
