const villasRoutes = require('express').Router();
const { VillaController } = require('../controllers');
const { auth } = require('../middlewares/auth');

villasRoutes.get('/', auth, VillaController.getAll);

module.exports = villasRoutes;