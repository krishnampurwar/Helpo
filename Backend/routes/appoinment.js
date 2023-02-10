const { Router } = require('express');
const appoinmentController = require('../controllers/appoinmentController');
const router = Router();
const auth = require('../middleware/auth');

router.post('/adddetails/:id', auth,appoinmentController.appointmentDetails);
router.get('/getdetails/:id', auth,appoinmentController.getappoinmentdetails);

module.exports = router;