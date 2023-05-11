const villaReviewsRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { VillaReviewController } = require('../controllers');

villaReviewsRoutes.get('/', auth, VillaReviewController.getAll);
villaReviewsRoutes.get('/villas/:VillaId', auth, VillaReviewController.getByVilla);
villaReviewsRoutes.get('/users/:UserId', auth, VillaReviewController.getByUser);
villaReviewsRoutes.post('/add', auth, VillaReviewController.add);