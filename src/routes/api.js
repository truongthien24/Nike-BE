const express = require("express");
const userController = require("../controllers/user.controller");
const accountController = require("../controllers/account.controller");
const sanPhamController = require("../controllers/sanPham.controller");
const gioHangController = require("../controllers/gioHang.controller");
const chiTietGioHangController = require("../controllers/chiTietGioHang.controller");
const kichCoController = require("../controllers/kichCo.controller");
const danhGiaController = require("../controllers/danhGia.controller");
const donHangController = require("../controllers/donHang.controller");
const khuyenMaiController = require("../controllers/khuyenMai.controller");
const bannerController = require("../controllers/banner.controller");
const thuongHieuController = require("../controllers/thuongHieu.controller");
const { paymentOnline } = require("../utils/paymentOnline");

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

router.post("/login-admin", accountController.loginAdmin)

router.post("/change-password", accountController.changePassword)


// ======================= Product ===============================
router.post("/create-product", sanPhamController.createSanPham);

router.get("/get-all-product", sanPhamController.getAllSanPham);

router.patch("/update-product/:id", sanPhamController.updateSanPham);

router.delete("/delete-product/:id", sanPhamController.deleteSanPham);

router.post("/find-product", sanPhamController.findSanPham);


// ======================= Cart ===============================
router.post("/create-cart", gioHangController.createGioHang);

router.get("/get-all-cart", gioHangController.getAllGioHang);

router.patch("/update-cart/:id", gioHangController.updateGioHang);

router.delete("/delete-cart", gioHangController.deleteGioHang);

router.post("/find-cart", gioHangController.findGioHang);

router.get("/get-cart-by-ID/:id", gioHangController.getGioHangByID);

router.post("/thanhToan", paymentOnline);


// ========================= Detail Cart ========================
router.post('/create-detail-cart', chiTietGioHangController.createChiTietGioHang);

// ========================= Kích cở ============================
router.post('/create-kichCo', kichCoController.createKichCo)
router.get('/get-all-kichCo', kichCoController.getAllKichCo)

// ========================= Đánh giá ============================
router.post('/create-danhGia', danhGiaController.createDanhGia)
router.get('/get-all-danhGia', danhGiaController.getAllDanhGia)
router.get('/get-danhGia-byID/:id', danhGiaController.getDanhGiaByIDSanPham)


// ========================= Đơn hàng ============================
router.post('/create-donHang', donHangController.createNewDonHang)
router.patch('/update-donHang/:id', donHangController.updateDonHang)
router.get('/get-donHang-byIdDUser/:id', donHangController.getDonHangByIdUser)


// ========================= Khuyến mãi ============================
router.post('/create-khuyenMai', khuyenMaiController.createKhuyenMai)
router.get('/get-all-khuyenMai', khuyenMaiController.getAllKhuyenMai)

// ========================= Banner ============================
router.post('/create-banner', bannerController.createBanner)
router.get('/get-all-banner', bannerController.getAllBanner)
router.get('/get-banner-byID/:id', bannerController.getBannerByID)
router.patch('/update-banner', bannerController.updateBanner)
router.delete('/delete-banner/:id', bannerController.deleteBanner)

// ========================= Thương hiệu ============================
router.post('/create-thuongHieu', thuongHieuController.createThuongHieu)
router.get('/get-all-thuongHieu', thuongHieuController.getAllThuongHieu)
router.get('/get-thuongHieu-byID/:id', thuongHieuController.getBannerByID)
router.patch('/update-thuongHieu', thuongHieuController.updateBanner)
router.delete('/delete-thuongHieu/:id', thuongHieuController.deleteBanner)


module.exports = router;
