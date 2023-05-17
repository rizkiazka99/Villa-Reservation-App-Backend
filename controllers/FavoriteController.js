const { Op } = require('sequelize');
const { Favorite, User, Villa } = require('../models');

class FavoriteController {
    static async getAll(request, response) {
        try {
            let result = await Favorite.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [User, Villa]
            });

            response.status(200).json({
                status: true,
                message: 'All Favorites fetched',
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

    static async getByUser(request, response) {
        try {
            const UserId = +request.userData.id;

            let result = await Favorite.findAll({
                order: [
                    ['id', 'asc']
                ],
                where: {
                    UserId: UserId
                }
            });

            response.status(200).json({
                status: true,
                message: `Favorites of a User with an ID of ${UserId} fetched`,
                data: result
            })
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async add(request, response) {
        try {
            const roleAuth = request.userData.role;
            const UserId = +request.userData.id;
            const { VillaId } = request.body;

            if(roleAuth !== 'User') {
                response.status(403).json({
                    status: false,
                    message: 'Only Users are allowed to do this action!',
                    data: null
                });
            } else {
                let duplicateFavorite = await Favorite.findAll({
                    where: {
                        [Op.and]: [
                            { UserId },
                            { VillaId }
                        ]
                    }
                });

                if (duplicateFavorite.length !== 0) {
                    response.status(403).json({
                        status: false,
                        message: 'You already have this Villa in your Favorites',
                        data: null
                    });
                } else {
                    let result = await Favorite.create({
                        UserId, VillaId
                    });
        
                    response.status(201).json({
                        status: true,
                        message: `Villa with an ID of ${VillaId} has been added to the Favorites of a User with an ID of ${UserId}`,
                        data: result
                    });
                }
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }

    static async delete(request, response) {
        try {
            const idAuth = +request.userData.id;
            const id = +request.params.id;

            let selectedFavorite = await Favorite.findByPk(id);

            if (idAuth !== selectedFavorite.UserId) {
                response.status(403).json({
                    status: false,
                    message: 'You are not the authorized user'
                });
            } else {
                let result = await Favorite.destroy({
                    where: { id }
                });

                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Favorite with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `Favorite with an ID of ${id} couldn't be deleted or wasn't found`
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }
}

module.exports = FavoriteController;