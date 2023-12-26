const db = require("../models");
const sendEmailPaymentSuccess = require("../utils/sendEmailPaymentSuccess");

const createNewDonHang = (data) => {
    const { userId,
        danhSach,
        thongTinGiaoHang,
        thongTinThanhToan,
        tongGia,
        email,
        gioHangId } = data;
    return new Promise(async (resolve, reject) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let maDon = "";

        for (let i = 0; i < 15; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            maDon += characters.charAt(randomIndex);
        }
        const danhSachThue = danhSach?.map((sach) => {
            return { ...sach, tinhTrang: false };
        });
        const donHang = await db.DonHang.create({
            userId,
            danhSach: danhSachThue,
            ngayTaoDon: (new Date()).toString(),
            thongTinGiaoHang,
            thongTinThanhToan,
            tongGia,
            maDonHang: maDon,
            loTrinhDonHang: 0,
            tinhTrang: 0,
        });

        if (donHang) {
            await sendEmailPaymentSuccess(email, "Đặt hàng thành công", donHang);
            for (let sanPham of danhSach) {
                const sachResult = await db.SanPham.findOne({ id: sanPham?.sanPham?.id });
                if (sachResult) {
                    const soLuongNew = sachResult?.dataValues.soLuong - sanPham?.soLuong;
                    const sanPhamNew = await db.SanPham.findOne({ id: sanPham?.sanPham?.id })
                    sanPhamNew.soLuong = soLuongNew;
                    await sanPhamNew.save();
                } else {
                    reject({ message: 'Sản phẩm khong ton tai' })
                }
            }
            await db.ChiTietGioHang.destroy(
                { where: { idCart: gioHangId } },
            );
            resolve({ message: "Hoàn tất", data: donHang });
        } else {
            return reject({ message: "Tạo đơn hàng không thành công" });
        }
    })
}

module.exports = { createNewDonHang }