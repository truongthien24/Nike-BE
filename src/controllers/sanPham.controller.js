const ProductServices = require("../services/sanPham.services");
const _ = require("lodash");

const createSanPham = async (req, res) => {
  try {
    const result = await ProductServices.createNewSanPham(req.body);
    return res.status(200).json(result);
  } catch (err) {

    return res.status(400).json(err);
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

const findSanPham = async (req, res) => {
  const result = await ProductServices.findSanPham(req.body);
  return res.status(200).json(result);
}

const deleteSanPham = async (req, res) => {
  const result = await ProductServices.deleteSanPham(req.params);
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
  findSanPham,
};
