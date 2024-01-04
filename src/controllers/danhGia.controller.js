const danhGiaServices = require("../services/danhGia.services");

const createDanhGia = async (req, res) => {
  try {
    const result = await danhGiaServices.createNewDanhGia(req.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAllDanhGia = async (req, res) => {
  try {
    const result = await danhGiaServices.getAllDanhGia();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getDanhGiaByIDSanPham = async (req, res) => {
  try {
    const result = await danhGiaServices.getDanhGiaByIDSanPham(req.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteDanhGia = async (req, res) => {
  try {
    const result = await danhGiaServices.deleteDanhGia(req.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  createDanhGia,
  getAllDanhGia,
  getDanhGiaByIDSanPham,
  deleteDanhGia,
};
