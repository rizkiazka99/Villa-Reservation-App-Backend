const favoritesRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { FavoriteController } = require('../controllers');

favoritesRoutes.get('/', auth, FavoriteController.getAll);
favoritesRoutes.get('/users', auth, FavoriteController.getByUser);
favoritesRoutes.post('/add', auth, FavoriteController.add);
favoritesRoutes.delete('/delete/:id', auth, FavoriteController.delete);

module.exports = favoritesRoutes;