"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("DonHangs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.TEXT
            },
            danhSach: {
                type: Sequelize.JSON,
            },
            ngayTaoDon: {
                type: Sequelize.TEXT
            },
            thongTinGiaoHang: {
                type: Sequelize.TEXT,
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
                type: Sequelize.TEXT,
                defaultValue: {},
                get() {
                    const rawValue = this.getDataValue("thongTinGiaoHang");
                    return rawValue ? JSON.parse(rawValue) : {};
                },
                set(value) {
                    this.setDataValue("thongTinGiaoHang", JSON.stringify(value));
                }
            },
            tongGia: {
                type: Sequelize.INTEGER
            },
            maDonHang: {
                type: Sequelize.TEXT
            },
            loTrinhDonHang: {
                type: Sequelize.INTEGER
            },
            tinhTrang: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("DonHangs");
    },
};
