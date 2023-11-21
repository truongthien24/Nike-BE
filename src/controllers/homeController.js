const connection = require("../config/database");

const getHomepage = (req, res) => {
  // Call model
  // let users = [];
  // connection.query("SELECT * FROM Users u", function (err, results, fields) {
  //   users = results;
  //   res.send(JSON.stringify(users));
  // });
  res.render("home.ejs");
};

const getAbc = (req, res) => {
  // Call model
  res.send("Hello ABC");
};

const getLogin = (req, res) => {
  res.render("login.ejs")
}

const getRender = (req, res) => {
  // Call model
  res.render("sample.ejs");
};



module.exports = {
  getHomepage,
  getAbc,
  getRender,
  getLogin
};
