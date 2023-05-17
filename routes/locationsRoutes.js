const locationsRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { LocationController } = require('../controllers');

locationsRoutes.get('/', auth, LocationController.getAll);
locationsRoutes.post('/add', auth, LocationController.add);
locationsRoutes.put('/update/:id', auth, LocationController.update);
locationsRoutes.delete('/delete/:id', auth, LocationController.delete);
locationsRoutes.get('/:id', auth, LocationController.getByID);

module.exports = locationsRoutes;