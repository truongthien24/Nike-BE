const ChiTietGioHangServices = require("../services/chiTietGioHang.services");

const createChiTietGioHang = async (req, res) => {
    try {
        const chiTietGioHang = await ChiTietGioHangServices.createChiTietGioHang(req.body);
        if(chiTietGioHang) {
            res.status(200).json(chiTietGioHang)
        }
    } catch (err) {
        res.status(500).json(res)
    }
}

module.exports = {createChiTietGioHang}