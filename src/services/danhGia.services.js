const db = require("../models");


const createNewDanhGia = (data) => {
    const { noiDung, idDanhGiaParent, ngayTao, idUser, idSanPham } = data;
    return new Promise(async (resolve, reject) => {
        const danhGia = await db.DanhGia.create({
            noiDung: noiDung,
            idDanhGiaParent: idDanhGiaParent,
            ngayTao: ngayTao,
            idUser: idUser,
            idSanPham: idSanPham,
        })
        if (danhGia) {
            resolve({ data: danhGia, message: 'Tạo thành công' });
        } else {
            reject({ message: 'Tạo không thành công' });
        }
    })
}

const getAllDanhGia = () => {
    return new Promise(async (resolve, reject) => {
        const danhGias = await db.DanhGia.findAll();
        if (danhGias) {
            resolve({ data: danhGias, message: "Success" })
        } else {
            reject({ message: 'Loi he thong' })
        }
    })
}

module.exports = { createNewDanhGia, getAllDanhGia }