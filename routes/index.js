const route = require('express').Router();
const usersRoutes = require('./usersRoutes.js');
const adminsRoutes = require('./adminsRoutes.js');
const villasRoutes = require('./villasRoutes.js');
const locationsRoutes = require('./locationsRoutes.js');
const villaGaleriesRoutes = require('./villaGaleriesRoutes.js');
const favoritesRoutes = require('./favoritesRoutes.js');
const villaReviewsRoutes = require('./villaReviewsRoutes.js');

route.get('/api', (request, response) => {
    response.status(200).json({
        message: 'ReserVilla API'
    });
});

route.use('/api/users', usersRoutes);
route.use('/api/admins', adminsRoutes);
route.use('/api/villas', villasRoutes);
route.use('/api/locations', locationsRoutes);
route.use('/api/villaGaleries', villaGaleriesRoutes);
route.use('/api/favorites', favoritesRoutes);
route.use('/api/villaReviews', villaReviewsRoutes);

module.exports = route;