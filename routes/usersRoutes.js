const usersRoutes = require('express').Router();
const { UserController } = require('../controllers');
const { upload } = require('../middlewares/multer.js')

usersRoutes.post('/login', UserController.login);
usersRoutes.post('/register', upload.single('profile-picture'), UserController.register);
usersRoutes.put('/update/:id', upload.single('profile-picture'), UserController.update);

module.exports = usersRoutes