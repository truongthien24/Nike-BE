require("dotenv").config();
// const mysql = require("mysql2");

const { Sequelize } = require("sequelize");

// Option : Passing parameters separately (other dialects)
const sequelize = new Sequelize("nike_be", "root", null, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully");
  } catch (error) {
    console.log("Fail to connect to the database", error);
  }
};

module.exports = connectDB
