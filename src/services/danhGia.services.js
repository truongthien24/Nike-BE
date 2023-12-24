const db = require("../models");
const _ = require("lodash");


const createNewDanhGia = (data) => {
    const { noiDung, idDanhGiaFather, idUser, idSanPham } = data;
    return new Promise(async (resolve, reject) => {
        const danhGia = await db.BinhLuan.create({
            noiDung: noiDung,
            diemDanhGia: 5,
            idDanhGiaParent: idDanhGiaFather,
            ngayTao: (new Date()).toString(),
            idUser: idUser,
            idSanPham: idSanPham,
            danhSachTraLoi: [],
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
        let danhGias = await db.BinhLuan.findAll();
        for (let i = 0; i < danhGias.length; i++) {
            const taiKhoan = await db.TaiKhoan.findOne({
                where: {
                    id: danhGias[i].dataValues.idUser,
                }
            })
            danhGias[i].dataValues.taiKhoan = taiKhoan.dataValues;
        }
        if (danhGias) {
            resolve({ data: danhGias, message: "Success" })
        } else {
            reject({ message: 'Lỗi hệ thống' })
        }
    })
}

const getDanhGiaByIDSanPham = (data) => {
    return new Promise(async (resolve, reject) => {
        let danhGias = await db.BinhLuan.findAll({ idSanPham: data?.idSanPham });
        for (let i = 0; i < danhGias.length; i++) {
            const taiKhoan = await db.TaiKhoan.findOne({
                where: {
                    id: danhGias[i].dataValues.idUser,
                }
            })
            danhGias[i].dataValues.taiKhoan = taiKhoan.dataValues;
        }
        let resultDanhGias = danhGias?.filter((danhGia) => danhGia.dataValues.idDanhGiaParent);
        let resultDanhGiasFather = danhGias
            ?.filter((danhGia) => !danhGia.dataValues.idDanhGiaParent)
            .map((dg) => {
                return { ...dg.dataValues, danhSachTraLoi: [] };
            });


        const newDanhGias = _.groupBy(resultDanhGias, (item) => {
            return [item["idDanhGiaParent"]];
        });

        const newResultDanhGias = _.map(
            _.keys(newDanhGias),
            function (e, indexBatch) {
                for (let danhGia of resultDanhGiasFather) {
                    if (
                        danhGia.id?.toString() ==
                        newDanhGias[e][0].idDanhGiaParent.toString()
                    ) {
                        danhGia.danhSachTraLoi = newDanhGias[e].map((detail) => {
                            return detail;
                        });
                    }
                }
                return {
                    Detail: newDanhGias[e].map((detail) => {
                        return detail;
                    }),
                    idDanhGiaParent: newDanhGias[e][0].idDanhGiaParent,
                };
            }
        );



        resolve({
            data: resultDanhGiasFather,
            message: "Lấy thành công",
        });
    })
}

module.exports = { createNewDanhGia, getAllDanhGia, getDanhGiaByIDSanPham }