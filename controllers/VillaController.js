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

    static async addVilla(request, response) {
        try {

        } catch(err) {
            
        }
    }
}

module.exports = VillaController