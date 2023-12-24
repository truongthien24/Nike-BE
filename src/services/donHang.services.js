const db = require("../models");

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
            loTrinhDonHang: "",
            tinhTrang: 0,
        });

        if (donHang) {
            await sendEmailPaymentSuccess(email, "Đặt hàng thành công", donHang);
            for (let sanPham of danhSach) {
                const sachResult = await db.SanPham.findOne({ id: sanPham?.sanPham?.id });
                if (sachResult) {
                    const soLuongNew = sachResult?.soLuong - sanPham?.soLuong;
                    await db.SanPham.findOneAndUpdate({ id: sanPham?.sanPham?.id }, { soLuong: soLuongNew })
                } else {
                    reject({ message: 'Sản phẩm khong ton tai' })
                }
            }
            await db.GioHang.findOneAndUpdate(
                { id: gioHangId },
                { danhSach: [], tongGia: 0 }
            );
            resolve({ message: "Hoàn tất", data: donHang });
        } else {
            return reject({ message: "Tạo đơn hàng không thành công" });
        }
    })
}

module.exports = { createNewDonHang }