const connection = require("../config/database");
const jwt = require("jsonwebtoken");
const db = require("../models");

const postCreateUser = (req, res) => {
  const {email, tenDangNhap, matKhau, city} = req?.body;
  connection.query(
    `INSERT INTO 
    TaiKhoan (email, tenDangNhap, city, matKhau)
      VALUES (?, ?, ?)`,
    [email, tenDangNhap, city, matKhau],
    (err, results) => {
      if(err) {
        res.status(400).json({message: 'Tài khoản đã tồn tại'})
      }
      if(results.length > 0) {
        res.status(200).json({message: "Created user success"});
      }
    }
  );
};

const loginUser = (req, res) => {
  const {tenDangNhap, matKhau} = req.body;
  console.log('req', req.body)

  connection.query(
    `SELECT * FROM TaiKhoan Where tenDangNhap = ? AND matKhau = ?`,
    [tenDangNhap, matKhau],
    (err, results) => {
      console.log('results', results)
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        const user = results[0];
        // Đăng ký token
        const token = jwt.sign({ user }, "jwtSecretKey", { expiresIn: 300 });
        // Thành công trả về status 200 và message
        return res.status(200).json({
          token,
          data: {
            city: results[0]?.city,
            email: results[0]?.email,
            id: results[0]?.id,
            tenDangNhap: results[0]?.tenDangNhap,
          },
          message: "Login sucess!",
        });
      } else {
        // Thất bại trả về status 500 và message
        return res.status(400).json({ message: "Login fail!" });
      }
    }
  );
};

const getAllUser = async (req, res) => {
  // connection.query(
  //   `SELECT * FROM
  //     Users`,
  //   (err, results) => {
  //     res.status(200).json({ message: "Get user success", data: results });
  //   }
  // );
  try {
    const data = await db.User.findAll();
    res.status(200).json({ message: "Get user success", data: data });
  } catch (error) {
    return res.status(400).json({ error: { message: error } });
  }
};

module.exports = {
  postCreateUser,
  loginUser,
  getAllUser,
};
