const khuyenMaiServices = require('../services/khuyenMai.services');

const createKhuyenMai = async (req, res) => {
    try {
        const result = await khuyenMaiServices.createNewKhuyenMai(req.body);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

const getAllKhuyenMai = async (req, res) => {
    try {
        const result = await khuyenMaiServices.getAllKhuyenMai();
        if (result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports = { createKhuyenMai, getAllKhuyenMai }