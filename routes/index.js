const route = require('express').Router();
const usersRoutes = require('./usersRoutes.js');

route.get('/api', (request, response) => {
    response.status(200).json({
        message: 'ReserVilla API'
    });
});

route.use('/api/users', usersRoutes);

module.exports = route;