const bookingsRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { BookingController } = require('../controllers');

bookingsRoutes.get('/', auth, BookingController.getAll);
bookingsRoutes.get('/users/:UserId', auth, BookingController.getByUser);
bookingsRoutes.get('/villas/:VillaId', auth, BookingController.getByVilla);
bookingsRoutes.get('/:id', auth, BookingController.getById);
bookingsRoutes.post('/book', auth, BookingController.book);
bookingsRoutes.delete('/cancel/:id', auth, BookingController.cancel);

module.exports = bookingsRoutes;