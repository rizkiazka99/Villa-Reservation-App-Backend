const { Favorite } = require('../models');

class FavoriteController {
    static async getAll(request, response) {
        try {
            let result = await Favorite.findAll({
                order: [
                    ['id', 'asc']
                ]
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
            const { UserId, LocationId, name, description, price, map_url } = request.body;

            let result = await Favorite.create({
                UserId, LocationId, name, description, price, map_url
            });

            response.status(201).json({
                status: true,
                message: `${name} has been added to the Favorites of a User with an ID of ${UserId}`,
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