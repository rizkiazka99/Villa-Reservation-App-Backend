const { Villa, Location, VillaGalery, VillaReview, Booking, Favorite, sequelize } = require('../models');

class VillaController {
    static async getAll(request, response) {
        try {
            let result = await Villa.findAll({
                order: [
                    [ 'id', 'asc' ]
                ],
                include: [ Location, VillaReview, Favorite, VillaGalery ]
            });

            if (result.length > 0) {
                let totalRating = 0;
                let averageRating = 0;

                for(let i = 0; i < result.length; i++) {
                    if (result[i].VillaReviews.length !== 0) {
                        let VillaReviews = result[i].VillaReviews;

                        for(let j = 0; j < VillaReviews.length; j++) {
                            totalRating += VillaReviews[j].rating;
                            averageRating = totalRating / VillaReviews.length
                        }

                        result[i].averageRating = averageRating;
                        totalRating = 0;
                        averageRating = 0;
                    } else {
                        result[i].averageRating = null
                    }
                }

                const fixedData = result.map((villa) => {
                    return {
                        id: villa.id,
                        LocationId: villa.LocationId,
                        name: villa.name,
                        price: villa.price,
                        Location: villa.Location,
                        VillaGalleries: villa.VillaGaleries,
                        averageRating: villa.averageRating,
                        Favorites: villa.Favorites
                    }
                });

                response.status(200).json({
                    status: true,
                    message: 'All villas fetched',
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: 'No villa found',
                    data: result
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

    static async add(request, response) {
        try {
            const roleAuth = request.userData.role;
            const { LocationId, name, description, price, map_url, phone, bedroom, bathroom, swimming_pool } = request.body;

            if (roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action',
                    data: null
                });
            } else {
                let result = await Villa.create({
                    LocationId, name, description, price, map_url, phone, bedroom, bathroom, swimming_pool
                });

                response.status(201).json({
                    status: true,
                    message: `${name} has been created!`,
                    data: result
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

    static async update(request, response) {
        try {
            const id = +request.params.id;
            const roleAuth = request.userData.role;

            if (roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action'
                });
            } else {
                const { LocationId, name, description, price, map_url, phone, bedroom, bathroom, swimming_pool } = request.body;
                let defaultData = await Villa.findByPk(id);

                let result = await Villa.update({
                    LocationId: LocationId === undefined ? defaultData.LocationId : LocationId,
                    name: name === undefined ? defaultData.name : name,
                    description: description === undefined ? defaultData.description : description,
                    price: price === undefined ? defaultData.price : price,
                    map_url: map_url === undefined ? defaultData.map_url : map_url,
                    phone: phone === undefined ? defaultData.phone : phone,
                    bedroom: bedroom === undefined ? defaultData.bedroom : bedroom,
                    bathroom: bathroom === undefined ? defaultData.bathroom : bathroom,
                    swimming_pool: swimming_pool === undefined ? defaultData.swimming_pool : swimming_pool
                }, {
                    where: {id}
                });

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `Villa with an ID of ${id} has been updated`
                }) : response.status(404).json({
                    status: true,
                    message: `Villa with an ID of ${id} couldn't be updated or wasn't found`
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }

    static async delete(request, response) {
        try {
            const roleAuth = request.userData.role;
            const id = +request.params.id;

            if (roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action'
                });
            } else {
                let result = await Villa.destroy({
                    where: { id }
                });

                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Villa with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `Villa with an ID of ${id} couldn't be deleted or wasn't found`
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

            let result = await Villa.findByPk(id, {
                order: [
                    ['id', 'asc']
                ],
                include: [Location, VillaReview, VillaGalery, Booking, Favorite]
            });

            result !== null ? response.status(200).json({
                status: true,
                message: `Villa with an ID of ${id} found!`,
                data: result
            }) : response.status(404).json({
                status: true,
                message: `Villa with an ID of ${id} wasn't found!`,
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

    static async getByLocation(request, response) {
        try {
            const LocationId = +request.params.LocationId;

            let result = await Villa.findAll({
                where: {LocationId},
                include: [Location, VillaReview, Favorite, VillaGalery],
                order: [
                    ['id', 'asc']
                ]
            });

            if (result.length > 0) {
                let totalRating = 0;
                let averageRating = 0;

                for(let i = 0; i < result.length; i++) {
                    if (result[i].VillaReviews.length !== 0) {
                        let VillaReviews = result[i].VillaReviews;

                        for(let j = 0; j < VillaReviews.length; j++) {
                            totalRating += VillaReviews[j].rating;
                            averageRating = totalRating / VillaReviews.length
                        }

                        result[i].averageRating = averageRating;
                        totalRating = 0;
                        averageRating = 0;
                    } else {
                        result[i].averageRating = null
                    }
                }

                const fixedData = result.map((villa) => {
                    return {
                        id: villa.id,
                        LocationId: villa.LocationId,
                        name: villa.name,
                        price: villa.price,
                        Location: villa.Location,
                        VillaGalleries: villa.VillaGaleries,
                        averageRating: villa.averageRating,
                        Favorites: villa.Favorites
                    }
                });

                response.status(200).json({
                    status: true,
                    message: `${result.length} results found`,
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: `${result.length} results found`,
                    data: result
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

    static async search(request, response) {
        try {
            const query = request.params.query.toLowerCase();

            let result = await Villa.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('Villa.name')), 'LIKE', '%' + query + '%')
                },
                include: [Location, VillaReview, Favorite, VillaGalery],
                order: [
                    ['id', 'asc']
                ]
            });

            if (result.length > 0) {
                let totalRating = 0;
                let averageRating = 0;

                for(let i = 0; i < result.length; i++) {
                    if (result[i].VillaReviews.length !== 0) {
                        let VillaReviews = result[i].VillaReviews;

                        for(let j = 0; j < VillaReviews.length; j++) {
                            totalRating += VillaReviews[j].rating;
                            averageRating = totalRating / VillaReviews.length
                        }

                        result[i].averageRating = averageRating;
                        totalRating = 0;
                        averageRating = 0;
                    } else {
                        result[i].averageRating = null
                    }
                }

                const fixedData = result.map((villa) => {
                    return {
                        id: villa.id,
                        LocationId: villa.LocationId,
                        name: villa.name,
                        price: villa.price,
                        Location: villa.Location,
                        VillaGalleries: villa.VillaGaleries,
                        averageRating: villa.averageRating,
                        Favorites: villa.Favorites
                    }
                });

                response.status(200).json({
                    status: true,
                    message: `${result.length} results found`,
                    data: fixedData
                });
            } else {
                response.status(404).json({
                    status: true,
                    message: `${result.length} results found`,
                    data: result
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

module.exports = VillaController