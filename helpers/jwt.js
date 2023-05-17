const jwt = require('jsonwebtoken');
const secretCode = process.env.SECRETCODE || 'undecryptable-secret';

const generateToken = (data) => {
    const { id, email, phone, name, password, profile_picture, role } = data;

    return jwt.sign({
        id, email, phone, name, password, profile_picture, role
    }, secretCode);
}

const verifyToken = (token) => {
    return jwt.verify(token, secretCode);
}

module.exports = {
    generateToken,
    verifyToken
}