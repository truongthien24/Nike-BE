const db = require("../models");
const sendEmailPaymentSuccess = require("../utils/sendEmailPaymentSuccess");

const createNewDonHang = (data) => {
  const {
    userId,
    danhSach,
    thongTinGiaoHang,
    thongTinThanhToan,
    tongGia,
    email,
    gioHangId,
  } = data;
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
      ngayTaoDon: new Date().toString(),
      thongTinGiaoHang,
      thongTinThanhToan,
      tongGia,
      maDonHang: maDon,
      loTrinhDonHang: 0,
      tinhTrang: 1,
    });

    if (donHang) {
      await sendEmailPaymentSuccess(email, "Đặt hàng thành công", {
        userId,
        danhSach: danhSachThue,
        ngayTaoDon: new Date().toString(),
        thongTinGiaoHang,
        thongTinThanhToan,
        tongGia,
        maDonHang: maDon,
        loTrinhDonHang: 0,
        tinhTrang: 1,
      });
      for (let sanPham of danhSach) {
        const sachResult = await db.SanPham.findOne({
          id: sanPham?.sanPham?.id,
        });
        if (sachResult) {
          const soLuongNew = sachResult?.dataValues.soLuong - sanPham?.soLuong;
          const sanPhamNew = await db.SanPham.findOne({
            id: sanPham?.sanPham?.id,
          });
          sanPhamNew.soLuong = soLuongNew;
          await sanPhamNew.save();
        } else {
          reject({ message: "Sản phẩm khong ton tai" });
        }
      }
      await db.ChiTietGioHang.destroy({ where: { idCart: gioHangId } });
      resolve({ message: "Hoàn tất", data: donHang });
    } else {
      return reject({ message: "Tạo đơn hàng không thành công" });
    }
  });
};

const getDonHangByIdUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const { id } = data;
    let donHangs = await db.DonHang.findAll({ where: { userId: id } });
    const donsHangsResult = donHangs?.map((dh, index) => {
      return {
        ...dh.dataValues,
        danhSach: JSON.parse(dh?.dataValues?.danhSach),
        thongTinGiaoHang: JSON.parse(dh?.dataValues?.thongTinGiaoHang),
        thongTinThanhToan: JSON.parse(dh?.dataValues?.thongTinThanhToan),
      };
    });
    resolve({ data: donsHangsResult, message: "Success" });
  });
};

const updateDonHang = (data) => {
  const { id, loTrinhDonHang, maDonHang, ngayTaoDon, thongTinGiaoHang, thongTinThanhToan, tinhTrang, tongGia, userId, danhSach } = data;
  // Check exits data
  return new Promise(async (resolve, reject) => {
    const donHang = await db.DonHang.findOne({ where: { id: id } });
    if (donHang) {
      donHang.loTrinhDonHang = loTrinhDonHang || donHang?.loTrinhDonHang;
      donHang.maDonHang = maDonHang || donHang.maDonHang;
      donHang.ngayTaoDon = ngayTaoDon || donHang.ngayTaoDon;
      donHang.thongTinGiaoHang = thongTinGiaoHang || donHang?.thongTinGiaoHang;
      donHang.thongTinThanhToan = thongTinThanhToan || donHang?.thongTinThanhToan;
      donHang.tinhTrang = tinhTrang || donHang?.tinhTrang;
      donHang.tongGia = tongGia || donHang?.tongGia;
      donHang.userId = userId || donHang?.userId;
      if(tinhTrang === 4) {
        for (let sanPham of danhSach) {
          const sachResult = await db.SanPham.findOne({
            id: sanPham?.sanPham?.id,
          });
          if (sachResult) {
            const soLuongNew = sachResult?.dataValues.soLuong + sanPham?.soLuong;
            const sanPhamNew = await db.SanPham.findOne({
              id: sanPham?.sanPham?.id,
            });
            sanPhamNew.soLuong = soLuongNew;
            await sanPhamNew.save();
          } else {
            reject({ message: "Sản phẩm khong ton tai" });
          }
        }
      }
      await donHang.save();
      resolve({ data: donHang, message: "Update successfull" });
    } else {
      reject({ data: {}, message: "Not found banner" });
    }
  });
};

module.exports = { createNewDonHang, getDonHangByIdUser, updateDonHang };
