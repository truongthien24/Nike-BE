const db = require("../models");
const _ = require("lodash");


const createNewKhuyenMai = (data) => {
    const { maKhuyenMai, tenKhuyenMai, loaiKhuyenMai, phanTramKhuyenMai } = data;
    console.log('data', data)
    return new Promise(async (resolve, reject) => {
        const khuyenMai = await db.KhuyenMai.create({
            maKhuyenMai: maKhuyenMai,
            tenKhuyenMai: tenKhuyenMai,
            loaiKhuyenMai: loaiKhuyenMai,
            phanTramKhuyenMai: phanTramKhuyenMai,
        })
        if (khuyenMai) {
            resolve({ data: khuyenMai, message: 'Tạo thành công' });
        } else {
            reject({ message: 'Tạo không thành công' });
        }
    })
}

const getAllKhuyenMai = () => {
    return new Promise(async (resolve, reject) => {
        let khuyenMais = await db.KhuyenMai.findAll();
        if (khuyenMais) {
            resolve({ data: khuyenMais, message: "Success" })
        } else {
            reject({ message: 'Lỗi hệ thống' })
        }
    })
}

module.exports = { createNewKhuyenMai, getAllKhuyenMai }