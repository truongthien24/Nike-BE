const db = require("../models")

const createChiTietGioHang = (data) => {
    const { soLuong, idCart, idSanPham, thanhTien } = data;
    return new Promise(async (resolve, reject) => {
        // Check san pham da ton tai khong gio hang chua
        const exitsSanPham = await db.ChiTietGioHang.findOne({
            where: {
                idSanPham: idSanPham
            }
        })
        // Neu ton tai
        if (exitsSanPham) {
            // Cong so luong len
            exitsSanPham.soLuong = exitsSanPham.soLuong + 1;
            exitsSanPham.idCart = exitsSanPham?.idCart;
            exitsSanPham.idSanPham = exitsSanPham?.idSanPham;
            exitsSanPham.thanhTien = exitsSanPham?.thanhTien + thanhTien;
            await exitsSanPham.save();
            resolve({ data: exitsSanPham, message: 'Thêm vào giỏ hàng thành công' })
        } else {

            const chiTietGioHang = db.ChiTietGioHang.create({
                soLuong: soLuong,
                idCart: idCart,
                idSanPham: idSanPham,
                thanhTien: thanhTien,
            })
            if (chiTietGioHang) {
                resolve({ data: chiTietGioHang, message: 'Thêm vào giỏ hàng thành công' })
            } else {
                reject({ data: {}, message: 'Thêm thất bại' })
            }
        }
    })
}

module.exports = { createChiTietGioHang }