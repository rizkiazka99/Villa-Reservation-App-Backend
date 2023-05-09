const { Villa, Location, VillaGalery } = require('../models');

class VillaController {
    static async getAll(request, response) {
        try {
            let result = await Villa.findAll({
                order: [
                    [ 'id', 'asc' ]
                ],
                include: [ Location, VillaGalery ]
            });

            response.status(200).json({
                status: true,
                message: 'All villas fetched',
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
        
    }
}

module.exports = VillaController