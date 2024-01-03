const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../utils/function");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const createNewAccount = async (data) => {
  const { loaiTaiKhoan } = data;
  return new Promise(async (resolve, reject) => {
    if (loaiTaiKhoan === "user") {
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
        reject({ message: "Already username or email !", data: {} });
      } else {
        const hashPasswordFromBcrypt = await hashPassword(data?.matKhau);
        const gioHang = await db.GioHang.create({
          // ...data,
        });
        const dataResult = await db.TaiKhoan.create({
          ...data,
          tenDangNhap: data?.tenDangNhap,
          email: data?.email,
          matKhau: hashPasswordFromBcrypt,
          danhSachYeuThich: [],
          thongTinNhanHang: [],
          cartId: gioHang?.id,
          loaiTaiKhoan: data?.loaiTaiKhoan,
        });
        resolve({ message: "Register successfull", data: dataResult });
      }
    } else {
      const hashPasswordFromBcrypt = await hashPassword(data?.matKhau);
      const gioHang = await db.GioHang.create({
        // ...data,
      });
      const dataResult = await db.TaiKhoan.create({
        ...data,
        tenDangNhap: data?.tenDangNhap,
        email: data?.email,
        matKhau: hashPasswordFromBcrypt,
        danhSachYeuThich: [],
        thongTinNhanHang: [],
        cartId: gioHang?.id,
        loaiTaiKhoan: data?.loaiTaiKhoan,
      });
      resolve({ message: "Register successfull", data: dataResult });
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
      const {
        id,
        matKhau,
        danhSachYeuThich,
        tenDangNhap,
        email,
        thongTinNhanHang,
      } = data;
      // Check exits data
      const account = await db.TaiKhoan.findOne({ where: { id: id } });
      if (account) {
        const hashPasswordFromBcrypt = matKhau
          ? await hashPassword(matKhau)
          : account?.password;
        account.tenDangNhap = tenDangNhap || account?.tenDangNhap;
        account.matKhau = hashPasswordFromBcrypt;
        account.email = email || account?.email;
        account.danhSachYeuThich =
          danhSachYeuThich || account?.danhSachYeuThich;
        account.thongTinNhanHang =
          thongTinNhanHang || account?.thongTinNhanHang;
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

const loginAdmin = async (data) => {
  return new Promise(async (resolve, reject) => {
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
        if (account.loaiTaiKhoan == "admin") {
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
          reject({ message: "Tài khoản không được cấp quyền" });
        }
      } else {
        // Mật khẩu không chính xác
        resolve({
          data: null,
          message: "Password incorect!",
        });
      }
    } else {
      // Không tìm thấy account
      reject({
        data: null,
        message: "Not found account!",
      });
    }
  });
};

const forgetPassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check exits data
      const { email, danhSachYeuThich } = data;
      const account = await db.TaiKhoan.findOne({ where: { email: email } });

      if (account) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        const hashPasswordFromBcrypt = await hashPassword(result);
        await sendEmail(email, "New password", result);
        // await db.TaiKhoan.update(
        //   { matKhau: hashPasswordFromBcrypt },
        //   {
        //     where: {
        //       email: email,
        //     },
        //   }
        // )
        account.tenDangNhap = account?.tenDangNhap;
        account.matKhau = hashPasswordFromBcrypt;
        account.email = account?.email;
        account.danhSachYeuThich = account?.danhSachYeuThich;
        await account.save();
        resolve({
          data: hashPasswordFromBcrypt,
          message: "Send email success",
        });
      } else {
        resolve({ data: {}, message: "Email is not registered" });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const changePassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    const { id, matKhauHienTai, matKhauMoi } = data;
    const taiKhoan = await db.TaiKhoan.findOne({ where: {id: id} });
    const checkPassword = await bcrypt.compareSync(
      matKhauHienTai,
      taiKhoan?.matKhau
    );
    if (checkPassword) {
      if (!bcrypt.compareSync(matKhauMoi, taiKhoan?.matKhau)) {
        const hashPasswordFromBcrypt = await hashPassword(matKhauMoi);
        const updateAccount = await db.TaiKhoan.findOne(
          { where: { id: id } }
        );
        if (updateAccount) {
          updateAccount.matKhau = hashPasswordFromBcrypt;
          await updateAccount.save();
          resolve({ message: "Mật khẩu đã được cập nhật" });
        } else {
          reject({ message: "Cập nhật không thành công" });
        }
      } else {
       reject({ message: "Trùng với mật khẩu hiện tại" });
      }
    } else {
      reject({ message: "Mật khẩu hiện tại không chính xác" });
    }
  })
}

module.exports = {
  createNewAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
  login,
  getAccountByID,
  forgetPassword,
  loginAdmin,
  changePassword,
};
