const db = require("../models");
const _ = require("lodash");
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
    reject({ message: "Lỗi hệ thống" });
  });
};

const getAllSanPham = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sanPhams = await db.SanPham.findAll();
      for (let i = 0; i < sanPhams.length; i++) {
        if (!_.isEmpty(sanPhams[i].dataValues.maKhuyenMai)) {
          const khuyenMai = await db.KhuyenMai.findOne({
            where: {
              maKhuyenMai: sanPhams[i].dataValues.maKhuyenMai,
            },
          });
          sanPhams[i].dataValues.khuyenMai = khuyenMai.dataValues;
        }
      }
      resolve({ data: sanPhams, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const findSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { id, tenSanPham = "", listId, thuongHieu, giaSanPham } = data;
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
      } else if (thuongHieu || giaSanPham) {
        let fromPrice = 0;
        let toPrice = 0;
        switch (giaSanPham) {
          case 1: {
            fromPrice = 0;
            toPrice = 999999;
            break;
          }
          case 2: {
            fromPrice = 1000000;
            toPrice = 2000000;
            break;
          }
          case 3: {
            fromPrice = 2000001;
            toPrice = 50000000;
            break;
          }
        }
        products = await db.SanPham.findAll({
          where: {
            giaSanPham: {
              [Op.between]: [fromPrice, toPrice],
            },
            // thuongHieu: {
            //   [Op.in]: thuongHieu,
            // },
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
      for (let i = 0; i < products.length; i++) {
        if (!_.isEmpty(products[i].dataValues.maKhuyenMai)) {
          const khuyenMai = await db.KhuyenMai.findOne({
            where: {
              maKhuyenMai: products[i].dataValues.maKhuyenMai,
            },
          });
          products[i].dataValues.khuyenMai = khuyenMai.dataValues;
        }
      }
      resolve({ data: products, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const updateSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      tenSanPham,
      maThuongHieu,
      maMauSac,
      maKichCo,
      maKhuyenMai,
      hinhAnh,
      giaSanPham,
      soLuong,
      moTa,
      noiDung,
      trangThai,
      id,
    } = data;
    try {
      // Check exits data
      const product = await db.SanPham.findOne({ where: { id: id } });
      if (product) {
        let image = product?.hinhAnh;
        if (hinhAnh?.reupload) {
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
        product.noiDung = noiDung || product?.noiDung;
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
        // Check sản phẩm có đang trong giỏ hàng hay không 
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
