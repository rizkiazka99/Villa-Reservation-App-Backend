const villaGaleriesRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { upload } = require('../middlewares/multer.js');
const { VillaGaleryController } = require('../controllers');

villaGaleriesRoutes.get('/', auth, VillaGaleryController.getAll);

module.exports = villaGaleriesRoutes;