const { verifyToken } = require('../helpers/jwt.js');

const auth = (request, response, next) => {
    console.log('Auth initiated!');
    const accessToken = request.headers.accessToken;

    if (accessToken) {
        try {
            let verify_token = verifyToken(accessToken);
            request.userData = verify_token;
            next();
        } catch(err) {
            response.status(401).json({
                status: false,
                message: 'Access Token wasn\'t authenticated'
            });
        }
    } else {
        response.status(401).json({
            status: false,
            message: 'Access Token wasn\'t found'
        });
    }
}

module.exports = { auth };