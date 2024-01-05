const db = require("../models");
const { Op } = require("sequelize");

const createNewGioHang = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productNew = await db.GioHang.create({
        ...data,
      });
      resolve({ message: "Create successfull", data: productNew });
    } catch (err) {
      reject({ message: err });
    }
  });
};

const getAllGioHang = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.GioHang.findAll();
      resolve({ data: accounts, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const findGioHang = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { id } = data;
    const gioHang = await db.GioHang.findOne({
      where: {
        id: id,
      },
    });
    if (gioHang) {
      let tongGia = 0;
      let chiTietGioHang = await db.ChiTietGioHang.findAll({
        where: {
          idCart: gioHang.id,
        }
      })
      for (let i = 0; i < chiTietGioHang.length; i++) {
        const sanPham = await db.SanPham.findOne({
          where: {
            id: chiTietGioHang[i].dataValues.idSanPham,
          }
        })
        const khuyenMai = sanPham?.dataValues?.maKhuyenMai && await db.KhuyenMai.findOne({
          where: {
            maKhuyenMai: sanPham?.dataValues?.maKhuyenMai,
          }
        });
        chiTietGioHang[i].dataValues.sanPham = sanPham?.dataValues;
        chiTietGioHang[i].dataValues.sanPham.khuyenMai = khuyenMai?.dataValues;
        tongGia += chiTietGioHang[i].dataValues.thanhTien;
      }
      if (chiTietGioHang) {
        resolve({
          data: {
            ...gioHang.dataValues,
            tongGia: tongGia,
            danhSach: chiTietGioHang
          }, message: "Get success"
        });
      }
    } else {
      reject({ data: {}, message: "Get error" })
    }
  });
};

const updateGioHang = async (data) => {
  return new Promise(async (resolve, reject) => {
    // Check exits data
    const product = await db.GioHang.findOne({ where: { id: data?.id } });
    const danhSach = data?.danhSach;
    for (let chiTiet of danhSach) {
      const chiTietNew = await db.ChiTietGioHang.findOne({
        where: {
          id: chiTiet?.id
        }
      })
      if (chiTiet.useYN == false) {
        await chiTietNew.destroy();
        resolve({ data: product, message: "Update successfull" });
      } else {
        chiTietNew.soLuong = chiTiet?.soLuong || chiTietNew?.soLuong;
        chiTietNew.idCart = chiTietNew?.idCart;
        chiTietNew.idSanPham = chiTietNew?.idSanPham;
        chiTietNew.thanhTien = chiTiet?.thanhTien || chiTietNew?.thanhTien;
        await chiTietNew.save()
        resolve({ data: product, message: "Update successfull" });
      }
    }
    if (product) {
      await product.save();
    } else {
      reject({ data: {}, message: "Not found account" });
    }
  });
};

const deleteGioHang = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const account = await db.GioHang.findOne({ where: { id: data?.id } });
      if (account) {
        await account.destroy();
        resolve({ data: {}, message: "Delete successfull" });
      } else {
        resolve({ data: null, message: "Not found account" });
      }
    } catch (err) {
      reject(err);
    }
  });
};

// Check sản phẩm trước khi sang bước thanh toán
const checkSanPham = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { danhSach } = req.body;
    for (let sanPham of danhSach) {
      const check = await db.SanPham.findOne({ id: sanPham?.idSanPham });
      if (check) {
        if (check?.soLuong < sanPham?.soLuong) {
          return reject({
            message: `Sản phẩm ${check?.tenSach} chỉ còn ${check?.soLuong}, không đủ số lượng bạn cần :((`,
          });
        }
      } else {
        return reject({ message: `Sách không tồn tại` });
      }
    }
    resolve({ message: "Kiểm tra hoàn tất" });
  })
}

module.exports = {
  createNewGioHang,
  getAllGioHang,
  updateGioHang,
  deleteGioHang,
  findGioHang,
  checkSanPham,
};
