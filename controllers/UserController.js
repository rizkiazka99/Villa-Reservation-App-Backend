const { User } = require('../models');
const { decryptPassword } = require('../helpers/bcrypt.js');
const { generateToken, verifyToken } = require('../helpers/jwt.js');

class UserController {
    static async register(request, response) {
        try {
            let result;
            const { email, phone, name, password } = request.body;

            let duplicateAccount = await User.findAll({
                where: { email }
            });

            if (duplicateAccount) {
                response.status(403).json({
                    status: false,
                    message: 'This e-mail address has been used by another account',
                    data: null
                });
            } else {
                if (request.file) {
                    const profile_picture = request.file.path;

                    result = await User.create({
                        email, phone, name, password, profile_picture
                    });
                } else {
                    result = await User.create({
                        email, phone, name, password, profile_picture: null
                    });
                }

                response.status(201).json({
                    status: true,
                    message: 'Account was created successfully!',
                    access_token: null,
                    data: result
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                access_token: null,
                data: null
            });
        }
    }

    static async login(request, response) {
        try {
            const { email, password } = request.body;
 
            let account = await User.findOne({
                where: { email }
            });

            if (account) {
                const isPasswordCorrect = decryptPassword(password, account.password);

                if (isPasswordCorrect) {
                    let access_token = generateToken(account);
                    let verify_token = verifyToken(access_token);

                    response.status(200).json({
                        status: true,
                        message: 'Login Successful!',
                        access_token: access_token,
                        data: verify_token
                    });
                } else {
                    response.status(403).json({
                        status: false,
                        message: 'Invalid e-mail address or password',
                        access_token: null,
                        data: null
                    });
                }
            } else {
                response.status(404).json({
                    status: false,
                    message: 'Account with this e-mail address wasn\'t found',
                    access_token: null,
                    data: null
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                access_token: null,
                data: null
            });
        }
    }

    static async update(request, response) {
        try {
            const id = +request.params.id;
            const idAuth = +request.userData.id;
            const { email, phone, name, password } = request.body;
            let result;

            if (id !== idAuth) {
                response.status(403).json({
                    status: false,
                    message: 'You are not the authorized user!',
                    data: null
                });
            } else {
                let defaultData = await User.findByPk(id);

                if (request.file) {
                    let profile_picture = request.file.path;

                    result = await User.update({
                        email: email === undefined ? defaultData.email : email,
                        phone: phone === undefined ? defaultData.phone : phone,
                        name: name === undefined ? defaultData.name : name,
                        password: password == undefined ? defaultData.password : password,
                        profile_picture: profile_picture
                    });
                } else {
                    result = await User.update({
                        email: email === undefined ? defaultData.email : email,
                        phone: phone === undefined ? defaultData.phone : phone,
                        name: name === undefined ? defaultData.name : name,
                        password: password == undefined ? defaultData.password : password,
                        profile_picture: defaultData.profile_picture
                    });
                }

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `User with an ID of ${id} has been updated`,
                    data: result
                }) : response.status(404).json({
                    status: false,
                    message: `User with an ID of ${id} couldn't be updated or wasn't found`,
                    data: null
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }
}

module.exports = UserController;