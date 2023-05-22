const bookingsRoutes = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const { BookingController } = require('../controllers');

bookingsRoutes.get('/', auth, BookingController.getAll);
bookingsRoutes.get('/users/:UserId', auth, BookingController.getByUser);
bookingsRoutes.get('/villas/:VillaId', auth, BookingController.getByVilla);
bookingsRoutes.get('/:id', auth, BookingController.getById);
bookingsRoutes.post('/book', auth, BookingController.book);
bookingsRoutes.post('/notification', auth, BookingController.notification); // can't be used locally
bookingsRoutes.get('/check/:order_id', auth, BookingController.check); // alternative to above method
bookingsRoutes.get('/checkAll', auth, BookingController.checkAll)
bookingsRoutes.delete('/cancel/:id', auth, BookingController.cancel);

module.exports = bookingsRoutes;