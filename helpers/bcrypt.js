const bcrypt = require('bcrypt');
const saltRound = +process.env.SALTROUND || 5;

const encryptPassword = (password) => {
    return bcrypt.hashSync(String(password), saltRound);
}

const decryptPassword = (password, hashPassword) => {
    return bcrypt.compareSync(String(password), hashPassword);
}

module.exports = {
    encryptPassword,
    decryptPassword
}