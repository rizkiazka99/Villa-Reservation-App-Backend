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
                    bathroom: bathroom === bathroom ? defaultData.bathroom : bathroom,
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
            })
        }
    }
}

module.exports = VillaController