const villaGaleriesRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { upload } = require('../middlewares/multer.js');
const { VillaGaleryController } = require('../controllers');

villaGaleriesRoutes.get('/', auth, VillaGaleryController.getAll);
villaGaleriesRoutes.get('/:VillaId', auth, VillaGaleryController.getByVilla);
villaGaleriesRoutes.post('/add', auth, upload.array('villa-pictures', 12), VillaGaleryController.add);
villaGaleriesRoutes.delete('/delete/:id', auth, VillaGaleryController.delete);

module.exports = villaGaleriesRoutes;