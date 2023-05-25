const villaReviewsRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { VillaReviewController } = require('../controllers');

villaReviewsRoutes.get('/', auth, VillaReviewController.getAll);
villaReviewsRoutes.get('/villas/:VillaId', auth, VillaReviewController.getByVilla);
villaReviewsRoutes.get('/villas/:VillaId/desc', auth, VillaReviewController.getByVillaDesc);
villaReviewsRoutes.get('/villas/:VillaId/asc', auth, VillaReviewController.getByVillaAsc);
villaReviewsRoutes.get('/users', auth, VillaReviewController.getByUser);
villaReviewsRoutes.post('/add', auth, VillaReviewController.add);

module.exports = villaReviewsRoutes;