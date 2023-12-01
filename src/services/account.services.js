const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/function");
const jwt = require("jsonwebtoken");

const createNewAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("data", data);
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
          tenDangNhap: data?.tenDangNhap,
          email: data?.email,
          matKhau: hashPasswordFromBcrypt,
          danhSachYeuThich: [],
        });
        resolve({ message: "Register successfull", data: dataResult });
      }
    } catch (err) {
      console.log("chạy vô 3");
      reject({ message: err });
    }
  });
};

const getAllAccount = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accounts = await db.TaiKhoan.findAll();
      resolve({
        data: accounts,
        message: "Get success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAccountByID = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const account = await db.TaiKhoan.findOne({ where: { id: id } });
      resolve({
        data: account,
        message: "Get success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const updateAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, matKhau, danhSachYeuThich, tenDangNhap, email } = data;
      // Check exits data
      const account = await db.TaiKhoan.findOne({ where: { id: id } });
      if (account) {
        const hashPasswordFromBcrypt = matKhau
          ? await hashPassword(matKhau)
          : account?.password;
        account.tenDangNhap = tenDangNhap || account?.tenDangNhap;
        account.matKhau = hashPasswordFromBcrypt;
        account.email = email || account?.tenDangNhap;
        account.danhSachYeuThich =
          danhSachYeuThich || account?.danhSachYeuThich;
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
          const token = jwt.sign(
            {
              account: {
                ...account,
              },
            },
            "jwtSecretKey",
            {
              expiresIn: 300,
            }
          );
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
  getAccountByID,
};
