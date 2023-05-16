const villasRoutes = require('express').Router();
const { VillaController } = require('../controllers');
const { auth } = require('../middlewares/auth');

villasRoutes.get('/', auth, VillaController.getAll);
villasRoutes.post('/add', auth, VillaController.add);
villasRoutes.put('/update/:id', auth, VillaController.update);
villasRoutes.delete('/delete/:id', auth, VillaController.delete);
villasRoutes.get('/:id', auth, VillaController.getById);
villasRoutes.get('/locations/:LocationId', auth, VillaController.getByLocation);
villasRoutes.get('/search/:query', auth, VillaController.search);

module.exports = villasRoutes;