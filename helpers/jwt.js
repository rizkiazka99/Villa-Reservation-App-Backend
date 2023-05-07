const jwt = require('jsonwebtoken');
const secretCode = process.env.SECRETCODE || 'undecryptable-secret';

const generateToken = (data) => {
    const { id, email, phone, name, password, profile_picture } = data;

    return jwt.sign({
        id, email, phone, name, password, profile_picture
    }, secretCode);
}

const verifyToken = (token) => {
    return jwt.verify(token, secretCode);
}

module.exports = {
    generateToken,
    verifyToken
}