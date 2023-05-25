const { Location, Villa, VillaGalery, VillaReview } = require('../models');

class LocationController {
    static async getAll(request, response) {
        try {
            let result = await Location.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [ Villa ]
            });

            response.status(200).json({
                status: true,
                message: 'All locations fetched!',
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

    static async add(request, response) {
        try {
            const roleAuth = request.userData.role;

            if (roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action',
                    data: null
                });
            } else {
                const { name } = request.body;
                
                let result = await Location.create({ name });
                
                response.status(201).json({
                    status: true,
                    message: `${name} has been created`,
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
            const roleAuth = request.userData.role;
            const id = +request.params.id;

            if (roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action'
                });
            } else {
                const { name } = request.body;

                let result = await Location.update({ 
                    name 
                }, {
                    where: { id }
                });

                result[0] === 1 ? response.status(200).json({
                    status: true,
                    message: `Location with an ID of ${id} has been updated`
                }) : response.status(404).json({
                    status: false,
                    message: `Location with an ID of ${id} couldn't be updated or wasn't found`
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
                let result = await Location.destroy({
                    where: {id}
                });

                result === 1 ? response.status(200).json({
                    status: true,
                    message: `Location with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `Location with an ID of ${id} couldn't be deleted or wasn't found`
                });
            }
        } catch(err) {
            response.status(500).json({
                status: false,
                message: String(err)
            });
        }
    }

    static async getByID(request, response) {
        try {
            const id = +request.params.id;

            let result = await Location.findByPk(id, {
                include: [
                    { model: Villa, include: [
                        { model: Location },
                        { model: VillaGalery },
                        { model: VillaReview }
                    ]}
                ],
                order: [
                    ['id', 'asc'],
                    [Villa, VillaGalery, 'id', 'asc']
                ]
            });

            if (result) {
                let totalRating = 0;
                let averageRating = 0;

                for(let i = 0; i < result.dataValues.Villas.length; i++) {
                    if (result.dataValues.Villas[i].length != 0) {
                        if (result.dataValues.Villas[i].VillaReviews.length != 0) {
                            let villaReviews = result.dataValues.Villas[i].VillaReviews;

                            for (let j = 0; j < villaReviews.length; j++) {
                                totalRating += villaReviews[j].rating;
                                averageRating = totalRating / villaReviews.length
                            }

                            result.dataValues.Villas[i].averageRating = averageRating;
                            totalRating = 0;
                            averageRating = 0;
                        } else {
                            result.dataValues.Villas[i].averageRating = null
                        }
                    }
                }

                result = result.dataValues.Villas.map((villa) => {
                    return {
                        id: villa.id,
                        name: villa.name,
                        price: villa.price,
                        location: villa.Location.name,
                        averageRating: villa.averageRating,
                        VillaGalleries: villa.VillaGaleries
                    }
                });

                response.status(200).json({
                    status: true,
                    message: `Location with an ID of ${id} found`,
                    data: result
                })
            } else {
                response.status(404).json({
                    status: true,
                    message: `Location with an ID of ${id} wasn't found`,
                    data: result
                });
            }
        } catch(err) {
            console.log(err)
            response.status(500).json({
                status: false,
                message: String(err),
                data: null
            });
        }
    }
}

module.exports = LocationController;