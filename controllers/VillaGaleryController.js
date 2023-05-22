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
            const VillaId = +request.params.VillaId;

            let result = await VillaGalery.findAll({
                order: [
                    ['id', 'asc']
                ],
                where: {
                    VillaId: VillaId
                }
            });

            response.status(200).json({
                status: true,
                message: `VillaGallery of Villa with an ID of ${VillaId} fetched!`,
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

    static async getById(request, response) {
        try {
            const id = +request.params.id;

            let result = await VillaGalery.findByPk(id);

            response.status(200).json({
                status: true,
                message: `VillaGallery with an ID of ${id} fetched!`,
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
                const { VillaId } = request.body;
                let result;
                let resultArr = [];

                for(let i = 0; i < request.files.length; i++) {
                    result = await VillaGalery.create({
                        VillaId, image_name: request.files[i].path
                    });
                    
                    resultArr.push(result);
                }

                response.status(201).json({
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

    static async delete(request, response) {
        try {
            const roleAuth = request.userData.role;
            const id = +request.params.id;

            if(roleAuth !== 'Admin') {
                response.status(403).json({
                    status: false,
                    message: 'Only admins are allowed to do this action'
                });
            } else {
                let result = await VillaGalery.destroy({
                    where: {id}
                });
    
                result === 1 ? response.status(200).json({
                    status: true,
                    message: `VillaGallery with an ID of ${id} has been deleted`
                }) : response.status(404).json({
                    status: false,
                    message: `VillaGallery with an ID of ${id} couldn't be deleted or wasn't found`
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

module.exports = VillaGaleryController;