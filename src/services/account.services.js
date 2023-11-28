const bcrypt = require('bcryptjs');
const db = require('../models');
const salt = bcrypt.genSaltSync(10);

const createNewAccount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check exits account
            const account = await db.Account.findOne({ where: { userName: data?.userName } });
            if (account) {
                resolve({ message: 'Already account!', data: {} })
            } else {
                const hashPasswordFromBcrypt = await hashPassword(data?.password);
                const dataResult = await db.Account.create({
                    ...data,
                    password: hashPasswordFromBcrypt
                })
                resolve({ message: 'Register successfull', data: dataResult })
            }
        } catch (err) {
            reject({ message: err });
        }
    })
}

const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (err) {
            reject(err)
        }
    })
}

const getAllAccount = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const accounts = await db.Account.findAll();
            resolve({ data: accounts, message: 'Get success' })
        } catch (err) {
            reject(err)
        }
    })
}

const updateAccount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check exits data
            const account = await db.Account.findOne({ where: { id: data?.id } });
            if (account) {
                const hashPasswordFromBcrypt = data?.password ? await hashPassword(data?.password) : account?.password;
                account.userName = data?.userName || account?.userName;
                account.password = hashPasswordFromBcrypt;
                account.email = data?.email || account?.userName;
                await account.save();
                resolve({ data: account, message: 'Update successfull' })
            } else {
                resolve({ data: {}, message: 'Not found account' })
            }
        } catch (err) {
            reject(err);
        }
    })
}




module.exports = { createNewAccount, getAllAccount, updateAccount }