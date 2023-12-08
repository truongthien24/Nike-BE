const db = require("../models");
const { Op } = require("sequelize");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const createNewSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { hinhAnh } = data;
    // Check exits account
    const product = await db.SanPham.findOne({
      where: {
        [Op.or]: [
          {
            tenSanPham: data?.tenSanPham,
          },
        ],
      },
    });
    if (product) {
      resolve({ message: "Already product !", data: {} });
    } else {
      const uploadImage = await uploadToCloudinary(hinhAnh, "sanPham");

      const productNew = await db.SanPham.create({
        ...data,
        hinhAnh: uploadImage.secure_url,
      });

      resolve({ message: "Create successfull", data: productNew });
    }
    reject({ message: "Lôi roi" });
  });
};

const getAllSanPham = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.SanPham.findAll();
      resolve({ data: accounts, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const findSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { id, tenSanPham, listId } = data;
    try {
      let products;
      if (id) {
        products = await db.SanPham.findOne({
          where: {
            id: id,
          },
        });
      } else if (listId) {
        products = await db.SanPham.findAll({
          where: {
            id: {
              [Op.in]: listId,
            },
          },
        });
      } else {
        products = await db.SanPham.findAll({
          where: {
            tenSanPham: {
              [Op.like]: `%${tenSanPham}%`,
            },
          },
        });
      }
      resolve({ data: products, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const updateSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { tenSanPham, maThuongHieu, maMauSac, maKichCo, maKhuyenMai, hinhAnh, giaSanPham, soLuong, moTa, noiDung, trangThai, id } = data;
    try {
      // Check exits data
      const product = await db.SanPham.findOne({ where: { id: id } });
      if (product) {
        let image = product?.hinhAnh;
        if(hinhAnh?.reupload) {
          image = await uploadToCloudinary(hinhAnh?.file, "sanPham");
        }
        product.tenSanPham = tenSanPham || product?.tenSanPham;
        product.maThuongHieu = maThuongHieu || product.maThuongHieu;
        product.maMauSac = maMauSac || product.maMauSac;
        product.maKichCo = maKichCo || product.maKichCo;
        product.maKhuyenMai = maKhuyenMai || product.maKhuyenMai;
        product.hinhAnh = image || product.hinhAnh;
        product.giaSanPham = giaSanPham || product.giaSanPham;
        product.soLuong = soLuong || product.soLuong;
        product.moTa = moTa || product?.moTa;
        product.trangThai = trangThai || product?.trangThai;
        product.noiDung =
          noiDung || product?.noiDung;
        await product.save();
        resolve({ data: product, message: "Update successfull" });
      } else {
        resolve({ data: {}, message: "Not found account" });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const deleteSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const account = await db.SanPham.findOne({ where: { id: data?.id } });
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

module.exports = {
  createNewSanPham,
  getAllSanPham,
  updateSanPham,
  deleteSanPham,
  findSanPham,
};
