const express = require("express");
const {
  getHomepage,
  getAbc,
  getRender,
  getLogin,
} = require("../controllers/homeController");

const router = express.Router();

router.get("/", getHomepage);

router.get("/abc", getAbc);

router.get("/render", getRender);

router.get("/login", getLogin)

module.exports = router;
