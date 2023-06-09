const { User, Favorite, VillaReview, Booking, sequelize } = require('../models');
const { encryptPassword, decryptPassword } = require('../helpers/bcrypt.js');
const { generateToken, verifyToken } = require('../helpers/jwt.js');
const { Op } = require('sequelize');

class UserController {
    static async register(request, response) {
        try {
            let result;
            const { email, phone, name, password } = request.body;

            let duplicateAccountEmail = await User.findOne({
                where: { email }
            });

            let duplicateAccountPhone = await User.findOne({
                where: { phone }
            });

            if (duplicateAccountEmail) {
                response.status(403).json({
                    status: false,
                    message: 'This e-mail address has been used by another account',
                    data: null
                });
            } else if (duplicateAccountPhone) {
                response.status(403).json({
                    status: false,
                    message: 'This phone number has been used by another account',
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

    static async verifyPassword(request, response) {
        try {
            const role = request.userData.role;
            const id = +request.userData.id;
            const { password } = request.body;

            if (role !== 'User') {
                response.status(403).json({
                    status: false,
                    message: 'Only Users are allowed to do this action'
                });
            } else {
                let account = await User.findOne({
                    where: { id }
                });

                if (account) {
                    const isPasswordCorrect = decryptPassword(password, account.password);

                    if (isPasswordCorrect) {
                        response.status(200).json({
                            status: true,
                            message: 'Password verified!'
                        });
                    } else {
                        response.status(403).json({
                            status: false,
                            message: 'Failed to verify password'
                        });
                    }
                } else {
                    response.status(404).json({
                        status: false,
                        message: 'Account with this e-mail address wasn\'t found'
                    });
                }
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }

    static async update(request, response) {
        try {
            const id = +request.params.id;
            const idAuth = +request.userData.id;
            const { phone, name, password } = request.body;
            let result;

            if (id !== idAuth) {
                response.status(403).json({
                    status: false,
                    message: 'You are not the authorized user!'
                });
            } else {
                let defaultData = await User.findByPk(id);

                if (request.file) {
                    let profile_picture = request.file.path;

                    result = await User.update({
                        phone: phone === undefined ? defaultData.phone : phone,
                        name: name === undefined ? defaultData.name : name,
                        password: password == undefined ? defaultData.password : encryptPassword(password),
                        profile_picture: profile_picture
                    }, { 
                        where: {id} 
                    });
                } else {
                    result = await User.update({
                        phone: phone === undefined ? defaultData.phone : phone,
                        name: name === undefined ? defaultData.name : name,
                        password: password == undefined ? defaultData.password : encryptPassword(password),
                        profile_picture: defaultData.profile_picture
                    }, { 
                        where: {id} 
                    });
                }

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `User with an ID of ${id} has been updated`
                }) : response.status(404).json({
                    status: false,
                    message: `User with an ID of ${id} couldn't be updated or wasn't found`
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }

    static async getById(request, response) {
        try {
            const id = +request.params.id;

            let result = await User.findByPk(id, {
                include: [ Favorite, VillaReview, Booking ],
                attributes: {
                    exclude: [ 'password' ]
                }
            });

            result !== null ? response.status(200).json({
                status: true,
                message: `User with an ID of ${id} found!`,
                data: result
            }) : response.status(404).json({
                status: true,
                message: `User with an ID of ${id} wasn't found!`,
                data: null
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async search(request, response) {
        try {
            const query = request.params.query.toLowerCase();

            let result = await User.findAll({
                order: [
                    [ 'id', 'asc' ]
                ],
                where: {
                    [Op.or]: [
                        { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('User.name')), 'LIKE', '%' + query + '%') },
                        { email: sequelize.where(sequelize.fn('LOWER', sequelize.col('email')), 'LIKE', '%' + query + '%') }
                    ]
                }, 
                include: [ Favorite, VillaReview, Booking ],
                attributes: {
                    exclude: [ 'password' ]
                }
            });
            
            result.length !== 0 ? response.status(200).json({
                status: true,
                message: `${result.length} results found`,
                data: result
            }) : response.status(404).json({
                status: false,
                message: `${result.length} results found`,
                data: result
            });
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async getAll(request, response) {
        try {
            let result = await User.findAll({
                order: [
                    [ 'id', 'asc' ]
                ],
                include: [ Favorite, VillaReview, Booking ],
                attributes: {
                    exclude: [ 'password' ]
                }
            });

            response.status(200).json({
                status: true,
                message: 'All users fetched',
                data: result
            });
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