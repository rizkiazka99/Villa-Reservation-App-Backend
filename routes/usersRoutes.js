const usersRoutes = require('express').Router();
const { UserController } = require('../controllers');
const { upload } = require('../middlewares/multer.js');
const { auth } = require('../middlewares/auth.js');

usersRoutes.post('/login', UserController.login);
usersRoutes.post('/register', upload.single('profile-picture'), UserController.register);
usersRoutes.put('/update/:id', auth, upload.single('profile-picture'), UserController.update);

module.exports = usersRoutes