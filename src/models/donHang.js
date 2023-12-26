"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class DonHang extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DonHang.init(
        {
            userId: {
                type: DataTypes.TEXT
            },
            danhSach: {
                type: DataTypes.JSON,
            },
            ngayTaoDon: {
                type: DataTypes.TEXT
            },
            thongTinGiaoHang: {
                type: DataTypes.TEXT,
                defaultValue: {},
                get() {
                    const rawValue = this.getDataValue("thongTinGiaoHang");
                    return rawValue ? JSON.parse(rawValue) : {};
                },
                set(value) {
                    this.setDataValue("thongTinGiaoHang", JSON.stringify(value));
                }
            },
            thongTinThanhToan: {
                type: DataTypes.TEXT,
                defaultValue: {},
                get() {
                    const rawValue = this.getDataValue("thongTinThanhToan");
                    return rawValue ? JSON.parse(rawValue) : {};
                },
                set(value) {
                    this.setDataValue("thongTinThanhToan", JSON.stringify(value));
                }
            },
            tongGia: {
                type: DataTypes.INTEGER
            },
            maDonHang: {
                type: DataTypes.TEXT
            },
            loTrinhDonHang: {
                type: DataTypes.INTEGER
            },
            tinhTrang: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: "DonHang",
        }
    );
    return DonHang;
};





// userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "taiKhoan",
// },
// danhSach: {
//     type: Array,
// },
// ngayTaoDon: {
//     type: Date,
// },
// ngayGiao: {
//     type: Date
// },
// thongTinGiaoHang: {
//     ngayNhanHangDuKien: {
//         ngayBatDau: {
//             type: String,
//         },
//         ngayKetThuc: {
//             type: String,
//         }
//     },
//     thongTinNguoiNhan: {
//         tenNguoiNhan: {
//             type: String,
//         },
//         diaChi: {
//             type: String,
//         },
//         sdt: {
//             type: String,
//         },
//     },
// },
// thongTinThanhToan: {
//     phuongThucThanhToan: {
//         type: String,
//     },
//     viThanhToan: {
//         type: String,
//     },
//     thanhToan: {
//         type: Boolean
//     }
// },
// thongTinTraHang: {
//     ngayBatDau: {
//         type: String,
//     },
//     ngayKetThuc: {
//         type: String
//     }
// },
// tongGia: {
//     type: Number,
//     default: 0,
// },
// maDonHang: {
//     type: String,
// },
// loTrinhDonHang: {
//     type: Array,
//     default: [],
// },
// tinhTrang: {
//     type: Number,
//     default: 0
// }