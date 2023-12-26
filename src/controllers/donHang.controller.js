const donHangServices = require("../services/donHang.services");

const createNewDonHang = async (req, res) => {
  try {
    const result = await donHangServices.createNewDonHang(req.body);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getDonHangByIdUser = async (req, res) => {
  try {
    const result = await donHangServices.getDonHangByIdUser(req.params);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { createNewDonHang, getDonHangByIdUser };
