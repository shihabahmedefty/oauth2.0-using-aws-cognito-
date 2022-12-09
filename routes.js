var express = require('express');
var router = express.Router();
// var authController = require('./controllers/authController');
var helloController = require('./controllers/helloController');
var registerController = require('./controllers/registerController');
var loginController = require('./controllers/loginController');
var authMiddleware = require('./mIddleware/authMiddleware');


router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/hello', authMiddleware.validate, helloController.simple_hello);
module.exports = router;