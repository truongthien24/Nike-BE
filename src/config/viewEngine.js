const path = require("path");
const express = require("express"); // commonjs

const configViewEngie = (app) => {
  app.set("views", path.join('./src', "views"));
  app.set("view engine", "ejs");
  // Config static file => Tất cả các file ảnh lưu ở public
  app.use(express.static(path.join('./src', "public")));
};

module.exports = configViewEngie;
