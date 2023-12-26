const thuongHieuServices = require("../services/thuongHieu.services");

const createThuongHieu = async (req, res) => {
  try {
    const result = await thuongHieuServices.createNewThuongHieu(req.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAllThuongHieu = async (req, res) => {
  try {
    const result = await thuongHieuServices.getAllThuongHieu();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getBannerByID = async (req, res) => {
  try {
    const result = await thuongHieuServices.getBannerByID(req?.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateBanner = async (req, res) => {
  try {
    const result = await thuongHieuServices.updateBanner(req?.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const result = await thuongHieuServices.deleteBanner(req?.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { createThuongHieu, getAllThuongHieu, getBannerByID, updateBanner, deleteBanner };
