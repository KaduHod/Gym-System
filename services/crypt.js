const bcrypt = require('bcryptjs')

/**
 * 
 * @param {*} pwd Senha do formulario
 * @returns senha com hash
 */
const makeHash = pwd => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pwd, salt)
} 

/**
 * 
 * @param {*} pwd senha do form
 * @param {*} pwdDB senha do DB
 * @returns Ve se senha do formulario é igual a do DB
 */
const compareHash = (pwd, pwdDB) => {
    return bcrypt.compareSync(pwd, pwdDB)
}

module.exports = { compareHash, makeHash }