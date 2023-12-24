const db = require("../models");


const createNewKichCo = (data) => {
    const {soKichCo} = data;
    return new Promise(async(resolve, reject)=> {
        const checkTrung = await db.KichCo.findOne({where: {
            soKichCo: parseInt(soKichCo)
        }})
        if(checkTrung) {
            reject({message: 'Số kích cở đã tồn tại'})
        } else {
            const kichCo = await db.KichCo.create({
                soKichCo: soKichCo,
            })
            if(kichCo) {
                resolve({data: kichCo, message: 'Tạo thành công'});
            } else {
                reject({message: 'Tạo không thành công'});
            }
        }
    })
}

const getAllKichCo = () => {
    return new Promise(async (resolve, reject)=> {
        const kichCos = await db.KichCo.findAll();
        if(kichCos) {
            resolve({data: kichCos, message: "Success"})
        } else {
            reject({message: 'Loi he thong'})
        }
    })
}

module.exports = {createNewKichCo, getAllKichCo}