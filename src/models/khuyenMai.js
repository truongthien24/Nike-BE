"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KhuyenMai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KhuyenMai.init(
    {
      maKhuyenMai: {
        type: DataTypes.TEXT,
      },
      tenKhuyenMai: {
        type: DataTypes.TEXT,
      },
      loaiKhuyenMai: {
        type: DataTypes.INTEGER,
      },
      phanTramKhuyenMai: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      modelName: "KhuyenMai",
    }
  );
  return KhuyenMai;
};
