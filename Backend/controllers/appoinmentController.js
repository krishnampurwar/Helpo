const Appoinments = require("../models/Appoinment");
const User = require("../models/User")
module.exports.appointmentDetails = ((req , res) => {
  const  { name , 
  phoneno , 
  date,
  time,
  age

} = req.body;
const  patient  = req.params.id;
console.log(patient);
console.log("it's running");

const newAppoinment = Appoinments.create({
  name , phoneno , date , time , age , patient
})
  res.status(200).json({
    
    msg: ' added successfully!',
   
  });
});

module.exports.getappoinmentdetails = ((req , res ) => {
  userid = req.params.id;
 Appoinments.find({ patient: userid })
 .populate("patient" ,["name" , "email" , "_id"])
 .then(user => {
  res.status(200).json(user);
 })


})



