const AccountServices = require("../services/account.services");
const _ = require("lodash");

const registerAccount = async (req, res) => {
  const result = await AccountServices.createNewAccount(req.body);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const getAllAccount = async (req, res) => {
  const result = await AccountServices.getAllAccount();
  return res.status(200).json(result);
};

const getAccountByID = async (req, res) => {
  const { id } = req.params;
  const result = await AccountServices.getAccountByID(id);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const updateAccount = async (req, res) => {
  const result = await AccountServices.updateAccount(req.body);
  if (!_.isEmpty(result?.data)) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const deleteAccount = async (req, res) => {
  const result = await AccountServices.deleteAccount(req.body);
  if (result?.data) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const login = async (req, res) => {
  const result = await AccountServices.login(req.body);
  if (result?.data) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

module.exports = {
  registerAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
  login,
  getAccountByID,
};
