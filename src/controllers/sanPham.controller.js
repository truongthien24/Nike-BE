const ProductServices = require("../services/sanPham.services");
const _ = require("lodash");

const createSanPham = async (req, res) => {
  const result = await ProductServices.createNewSanPham(req.body);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const getAllSanPham = async (req, res) => {
  const result = await ProductServices.getAllSanPham();
  return res.status(200).json(result);
};

const updateSanPham = async (req, res) => {
  const result = await ProductServices.updateSanPham(req.body);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const deleteSanPham = async (req, res) => {
  const result = await ProductServices.deleteSanPham(req.body);
  if (result?.data) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

module.exports = {
  createSanPham,
  getAllSanPham,
  updateSanPham,
  deleteSanPham,
};