const kichCoServices = require('../services/kichCo.services');

const createKichCo = async (req, res) => {
    try {
        const result = await kichCoServices.createNewKichCo(req.body);
        if(result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

const getAllKichCo = async (req, res) => {
    try {
        const result = await kichCoServices.getAllKichCo();
        if(result) {
            return res.status(200).json(result);
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports = {createKichCo, getAllKichCo}