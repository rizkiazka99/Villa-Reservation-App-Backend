const adminsRoutes = require('express').Router();
const { AdminController } = require('../controllers');
const { upload } = require('../middlewares/multer.js');
const { auth } = require('../middlewares/auth.js');

adminsRoutes.post('/login', AdminController.login);
adminsRoutes.post('/register', upload.single('profile-picture'), AdminController.register);
adminsRoutes.put('/update/:id', auth, upload.single('profile-picture'), AdminController.update);
adminsRoutes.get('/:id', auth, AdminController.getById);
adminsRoutes.get('/search/:query', auth, AdminController.search);
adminsRoutes.get('/', auth, AdminController.getAll);

module.exports = adminsRoutes