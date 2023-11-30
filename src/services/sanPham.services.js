const db = require("../models");
const { Op } = require("sequelize");

const createNewSanPham = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
        const productNew = await db.SanPham.create({
          ...data,
        });
        resolve({ message: "Create successfull", data: productNew });
      }
    } catch (err) {
      reject({ message: err });
    }
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
    try {
      // Check exits data
      const product = await db.SanPham.findOne({ where: { id: data?.id } });
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
