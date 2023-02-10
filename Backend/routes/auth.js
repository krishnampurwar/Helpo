const { Router } = require('express');
const authController = require('../controllers/userController');
const router = Router();
const auth = require('../middleware/auth');
var bodyParser = require('body-parser')


router.post('/register', authController.signup);
router.get('/login', authController.login);
router.get('/user', auth, authController.get_user);

module.exports = router;