const { VillaGalery } = require('../models');

class VillaGaleryController {
    static async getAll(request, response) {
        try {
            let result = await VillaGalery.findAll({
                order: [
                    ['id', 'asc']
                ]
            });

            response.status(200).json({
                status: true,
                message: 'All Villa Galleries fetched!',
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

        } catch(err) {
            
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
                const { VillaId } = request.body;
                let result;
                let resultArr = [];

                for(let i = 0; request.files.length; i++) {
                    result = await VillaGalery.create({
                        VillaId, image_name: request.files[i].path
                    });
                    
                    resultArr.push(result);
                }

                response.status(200).json({
                    status: true,
                    message: `Images for Villa with an ID of ${VillaId} have been added`,
                    data: resultArr
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

module.exports = VillaGaleryController;