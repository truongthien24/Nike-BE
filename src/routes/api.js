const express = require("express");
const userController = require("../controllers/user.controller");
const accountController = require("../controllers/account.controller");
const sanPhamController = require("../controllers/sanPham.controller");
const gioHangController = require("../controllers/gioHang.controller");

const router = express.Router();

// ======================= User ===============================
router.post("/create-user", userController.postCreateUser);


// ======================= Account ===============================
router.post("/register-account", accountController.registerAccount);

router.get("/get-all-account", accountController.getAllAccount);

router.get("/get-account-by-ID/:id", accountController.getAccountByID);

router.patch("/update-account", accountController.updateAccount);

router.post("/get-password-by-email", accountController.forgetPassword);

router.delete("/delete-account", accountController.deleteAccount);

router.post("/login", accountController.login);




// ======================= Product ===============================
router.post("/create-product", sanPhamController.createSanPham);

router.get("/get-all-product", sanPhamController.getAllSanPham);

router.patch("/update-product", sanPhamController.updateSanPham);

router.delete("/delete-product", sanPhamController.deleteSanPham);

router.post("/find-product", sanPhamController.findSanPham);


// ======================= Cart ===============================
router.post("/create-cart", gioHangController.createGioHang);

router.get("/get-all-cart", gioHangController.getAllGioHang);

router.patch("/update-cart", gioHangController.updateGioHang);

router.delete("/delete-cart", gioHangController.deleteGioHang);

router.post("/find-cart", gioHangController.findGioHang);


module.exports = router;
