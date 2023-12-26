const bannerServices = require("../services/banner.services");

const createBanner = async (req, res) => {
  try {
    const result = await bannerServices.createNewBanner(req.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAllBanner = async (req, res) => {
  try {
    const result = await bannerServices.getAllBanner();
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getBannerByID = async (req, res) => {
  try {
    const result = await bannerServices.getBannerByID(req?.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateBanner = async (req, res) => {
  try {
    const result = await bannerServices.updateBanner(req?.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteBanner = async (req, res) => {
  try {
    const result = await bannerServices.deleteBanner(req?.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { createBanner, getAllBanner, getBannerByID, updateBanner, deleteBanner };
