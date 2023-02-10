const express = require('express');
const doctorController = require('../controllers/doctorController');
const doctorauth = require('../middleware/doctorAuth');
const app = express();


app.post('/doctorregister' , doctorController.signup)
app.get('/doctorlogin' , doctorController.login)
app.get('/allAppointmentdetails',doctorauth, doctorController.allAppoinmentdetails);
app.get('/appointmentById/:id',doctorauth, doctorController.AppointmentById);
app.post('/Updatedata',doctorauth, doctorController.AppointmentUpdate);
app.get('/allUser',doctorauth, doctorController.getallUserdetail);



module.exports = app;