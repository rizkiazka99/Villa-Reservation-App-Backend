const route = require('express').Router();
const usersRoutes = require('./usersRoutes.js');
const adminsRoutes = require('./adminsRoutes.js');
const villasRoutes = require('./villasRoutes.js');

route.get('/api', (request, response) => {
    response.status(200).json({
        message: 'ReserVilla API'
    });
});

route.use('/api/users', usersRoutes);
route.use('/api/admins', adminsRoutes);
route.use('/api/villas', villasRoutes);

module.exports = route;