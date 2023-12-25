"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BinhLuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BinhLuan.init(
    {
      noiDung: {
        type: DataTypes.STRING,
      },
      diemDanhGia: {
        type: DataTypes.INTEGER,
      },
      idDanhGiaParent: {
        type: DataTypes.INTEGER,
      },
      ngayTao: {
        type: DataTypes.TEXT,
      },
      idUser: {
        type: DataTypes.INTEGER
      },
      idSanPham: {
        type: DataTypes.INTEGER
      },
      danhSachTraLoi: {
        type: DataTypes.TEXT,
        defaultValue: [],
        get() {
          const rawValue = this.getDataValue("danhSachTraLoi");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("danhSachTraLoi", JSON.stringify(value));
        }
      },
    },
    {
      sequelize,
      modelName: "BinhLuan",
    }
  );
  return BinhLuan;
};
