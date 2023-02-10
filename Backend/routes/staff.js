const express = require('express');
const staffController = require('../controllers/staffController');
const staffauth = require('../middleware/staffAuth');
const app = express();

app.post('/staffregister' , staffController.signup)
app.get('/stafflogin' , staffController.login)
app.get('/getAlldetails',staffauth ,  staffController.AppoinmentAlldetails);
app.post('/updatestatus',staffauth, staffController.AppointmentUpdate);
app.get('/getOnedetail/:id', staffauth ,staffController.AppointmentById);
app.get('/getUserdetail',staffauth , staffController.getUserdetail);


module.exports = app;