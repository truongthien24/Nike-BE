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
    const { idAccount } = data;
    try {
      const products = await db.GioHang.findAll({
        where: {
          maTaiKhoan: idAccount,
        },
      });

      resolve({ data: products, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const updateGioHang = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const product = await db.GioHang.findOne({ where: { id: data?.id } });
      if (product) {
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

module.exports = {
  createNewGioHang,
  getAllGioHang,
  updateGioHang,
  deleteGioHang,
  findGioHang,
};
