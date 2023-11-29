const express = require("express");
const userController = require("../controllers/user.controller");
const accountController = require("../controllers/account.controller");
const sanPhamController = require("../controllers/sanPham.controller");

const router = express.Router();

// ======================= User ===============================
router.post("/create-user", userController.postCreateUser);


// ======================= Account ===============================
router.post("/register-account", accountController.registerAccount);

router.get("/get-all-account", accountController.getAllAccount);

router.patch("/update-account", accountController.updateAccount);

router.delete("/delete-account", accountController.deleteAccount);

router.post("/login", accountController.login);


// ======================= Product ===============================
router.post("/create-product", sanPhamController.createSanPham);

router.get("/get-all-product", sanPhamController.getAllSanPham);

router.patch("/update-product", sanPhamController.updateSanPham);

router.delete("/delete-product", sanPhamController.deleteSanPham);

router.post("/find-product", sanPhamController.findSanPham);

module.exports = router;
