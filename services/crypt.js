const bcrypt = require('bcryptjs')

const makeHash = pwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pwd, salt)
    return hash
} 

const compareHash = (pwd, pwdDB) => {
    return bcrypt.compareSync(pwd, pwdDB)
}

module.exports = { compareHash, makeHash }