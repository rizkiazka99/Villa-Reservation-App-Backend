const villasRoutes = require('express').Router();
const { VillaController } = require('../controllers');
const { auth } = require('../middlewares/auth');

villasRoutes.get('/', auth, VillaController.getAll);
villasRoutes.post('/add', auth, VillaController.add);

module.exports = villasRoutes;