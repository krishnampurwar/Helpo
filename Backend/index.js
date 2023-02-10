const express = require('express');
const dbconnection = require('./config/db_connection');
const app = express();
const path = require("path");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
const authRoutes = require('./routes/auth');
const appoinmentRoutes = require('./routes/appoinment');
const staffRoutes = require('./routes/staff');
const doctorRoutes = require('./routes/doctor');
app.use('/api',authRoutes);
app.use('/api',appoinmentRoutes);
app.use('/api', staffRoutes);
app.use('/api', doctorRoutes);


dbconnection();
app.get("/", (req,res) => {
res.send('running succesfully');
})
app.listen(8080, (err) => {
    if (err){
        console.log("not running");}
    else
        console.log("Server is running at port 8080:");
});