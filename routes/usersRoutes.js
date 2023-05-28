const usersRoutes = require('express').Router();
const { UserController } = require('../controllers');
const { upload } = require('../middlewares/multer.js');
const { auth } = require('../middlewares/auth.js');

usersRoutes.post('/login', UserController.login);
usersRoutes.post('/register', upload.single('profile-picture'), UserController.register);
usersRoutes.post('/verifyPassword', auth, UserController.verifyPassword);
usersRoutes.put('/update/:id', auth, upload.single('profile-picture'), UserController.update);
usersRoutes.get('/:id', auth, UserController.getById);
usersRoutes.get('/search/:query', auth, UserController.search);
usersRoutes.get('/', auth, UserController.getAll);

module.exports = usersRoutes