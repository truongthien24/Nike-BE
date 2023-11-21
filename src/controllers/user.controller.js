const connection = require("../config/database");
const jwt = require("jsonwebtoken");

const postCreateUser = (req, res) => {
  const email = req?.body?.email;
  const name = req?.body?.name;
  const city = req?.body?.city;
  connection.query(
    `INSERT INTO 
      Users (email, name, city)
      VALUES (?, ?, ?)`,
    [email, name, city],
    (err, results) => {
      res.send("Created user success");
    }
  );
};

const loginUser = (req, res) => {
  const {name, password} = req.body;
  connection.query(
    `SELECT * FROM Users Where name = ? AND password = ?`,
    [name, password],
    (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        const id = results[0]?.id;
        // Đăng ký token
        const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
        // Thành công trả về status 200 và message
        return res.status(200).json({
          token,
          data: {
            city: results[0]?.city,
            email: results[0]?.email,
            id: results[0]?.id,
            name: results[0]?.name,
          },
          message: "Login sucess!",
        });
      } else {
        // Thất bại trả về status 500 và message
        return res
          .status(400)
          .json({ message: "Login fail!" });
      }
    }
  );
};

const getAllUser = async (req, res) => {
  connection.query(
    `SELECT * FROM 
      Users`,
    (err, results) => {
      res.status(200).json({ message: "Get user success", data: results });
    }
  );
};

module.exports = {
  postCreateUser,
  loginUser,
  getAllUser,
};
