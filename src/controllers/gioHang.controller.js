const GioHangServices = require("../services/gioHang.services");
const _ = require("lodash");

const createGioHang = async (req, res) => {
  const result = await GioHangServices.createNewGioHang(req.body);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const getAllGioHang = async (req, res) => {
  const result = await GioHangServices.getAllGioHang();
  return res.status(200).json(result);
};

const findGioHang = async (req, res) => {
  try {
    const result = await GioHangServices.findGioHang(req.body);
    if (result) {
      res.status(200).json(result)
    }
  } catch (err) {
    return res.status(200).json(result);
  }
}

const getGioHangByID = async (req, res) => {
  try {
    const result = await GioHangServices.findGioHang(req.params);
    if (result) {
      res.status(200).json(result)
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}

const updateGioHang = async (req, res) => {
  try {
    const result = await GioHangServices.updateGioHang(req.body);
    if (result) {
    return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteGioHang = async (req, res) => {
  const result = await GioHangServices.deleteGioHang(req.body);
  if (result?.data) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

module.exports = {
  createGioHang,
  getAllGioHang,
  updateGioHang,
  deleteGioHang,
  findGioHang,
  getGioHangByID,
};
