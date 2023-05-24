const { Op } = require('sequelize');
const { VillaReview, User, Villa, VillaGalery } = require('../models');

class VillaReviewController {
    static async getAll(request, response) {
        try {
            let result = await VillaReview.findAll({
                order: [
                    ['id', 'asc']
                ],
                include: [ User, Villa ]
            });

            response.status(200).json({
                status: true,
                message: 'All VillaReviews fetched!',
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

    static async getByVilla(request, response) {
        try {
            const VillaId = +request.params.VillaId;
            
            let result = await VillaReview.findAll({
                where: { VillaId },
                include: [ User ],
                order: [
                    ['createdAt', 'desc']
                ]
            });

            if (result.length > 0) {
                let totalRating = 0;
                let averageRating = 0;
                
                result.forEach((review) => {
                    totalRating += review.rating;
                    averageRating = totalRating / result.length
                });
                result = {
                    reviews: result,
                    averageRating: averageRating
                };
            }

            response.status(200).json({
                status: true,
                message: `VillaReviews for Villa with an ID of ${VillaId} fetched`,
                data: result,
                
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
            
            let result = await VillaReview.findAll({
                where: { UserId },
                include: [
                    { model: Villa, include: [
                        { model: VillaGalery }
                    ]}
                ],
                order: [
                    ['createdAt', 'desc'],
                    [Villa, VillaGalery, 'id', 'asc']
                ]
            });

            response.status(200).json({
                status: true,
                message: `VillaReviews for a User with an ID of ${UserId} fetched`,
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
            const UserId = +request.userData.id;
            const { VillaId, rating, comment } = request.body;

            if (roleAuth !== 'User') {
                response.status(403).json({
                    status: false,
                    message: 'Only Users are allowed to do this action!',
                    data: null
                });
            } else {
                let duplicateReview = await VillaReview.findAll({
                    where: {
                        [Op.and]: [
                            { VillaId },
                            { UserId }
                        ]
                    }
                });

                if (duplicateReview.length !== 0) {
                    response.status(403).json({
                        status: false,
                        message: 'You have reviewed this Villa already!',
                        data: null
                    });
                } else {
                    let result = await VillaReview.create({
                        VillaId, UserId, rating, comment
                    });
        
                    response.status(201).json({
                        status: true,
                        message: 'VillaReview has been created',
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
}

module.exports = VillaReviewController;