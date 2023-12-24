"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DanhGia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DanhGia.init(
    {
      noiDung: {
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
    },
    {
      sequelize,
      modelName: "DanhGia",
    }
  );
  return DanhGia;
};
