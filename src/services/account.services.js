const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/function");
const jwt = require("jsonwebtoken");

const createNewAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits account
      const account = await db.TaiKhoan.findOne({
        where: {
          [Op.or]: [
            {
              tenDangNhap: data?.tenDangNhap,
            },
            {
              email: data?.email,
            },
          ],
        },
      });
      if (account) {
        resolve({ message: "Already username or email !", data: {} });
      } else {
        const hashPasswordFromBcrypt = await hashPassword(data?.matKhau);
        const dataResult = await db.TaiKhoan.create({
          ...data,
          matKhau: hashPasswordFromBcrypt,
        });
        resolve({ message: "Register successfull", data: dataResult });
      }
    } catch (err) {
      reject({ message: err });
    }
  });
};

const getAllAccount = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.TaiKhoan.findAll();
      resolve({ data: accounts, message: "Get success" });
    } catch (err) {
      reject(err);
    }
  });
};

const updateAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const account = await db.TaiKhoan.findOne({ where: { id: data?.id } });
      if (account) {
        const hashPasswordFromBcrypt = data?.matKhau
          ? await hashPassword(data?.matKhau)
          : account?.password;
        account.tenDangNhap = data?.tenDangNhap || account?.tenDangNhap;
        account.matKhau = hashPasswordFromBcrypt;
        account.email = data?.email || account?.tenDangNhap;
        await account.save();
        resolve({ data: account, message: "Update successfull" });
      } else {
        resolve({ data: {}, message: "Not found account" });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const deleteAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const account = await db.TaiKhoan.findOne({ where: { id: data?.id } });
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

const login = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check exits data
      const account = await db.TaiKhoan.findOne({
        where: { tenDangNhap: data?.tenDangNhap },
        raw: true,
        // attributes: {
        //   include: ["email", "userName", "password"],
        // },
      });
      if (account) {
        const checkPassword = await bcrypt.compareSync(
          data?.matKhau,
          account?.matKhau
        );
        if (checkPassword) {
          // Đăng ký token
          const token = jwt.sign({ account }, "jwtSecretKey", {
            expiresIn: "24h",
          });
          // Thành công trả về status 200 và message
          delete account.matKhau;
          resolve({
            token,
            data: account,
            message: "Login sucess!",
          });
        } else {
          // Mật khẩu không chính xác
          resolve({
            data: null,
            message: "Password incorect!",
          });
        }
      } else {
        // Không tìm thấy account
        resolve({
          data: null,
          message: "Not found account!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
  login,
};
