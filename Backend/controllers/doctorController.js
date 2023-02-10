const Appoinment = require('../models/Appoinment');
const user = require('../models/User');

const mongoose = require('mongoose');

const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');


module.exports.AppointmentUpdate = ((req , res) => {
    const {
        symptom , 
        diseases,
        id,
        medicine
    } = req.body;
    
      Appoinment.findByIdAndUpdate(id , {   
        $push: { 
            Symptoms : symptom ,
            disease : diseases,
            medicines : medicine
           } })
      .then(result => {
        res.status(200).json(result)
      })

});



module.exports.getallUserdetail = ((req,res) => {
    user.find()
    .select("-password")
    .then(result => {
        res.status(200).json(result);
    })
})

module.exports.allAppoinmentdetails = ((req,res) =>{

    Appoinment.find({"status.done" : "true"})
    .populate("patient" , ["name" , "email" , "_id"])
    .then(result => {
        res.status(200).json(result)
    })
    .catch((err) => {
        if(err) throw err;
    })

});

module.exports.AppointmentById = ((req,res) => {
    const id = req.params.id;
    console.log(id);
     Appoinment.findById(id)
     .select("-password")
     .then(result => {
         res.status(200).json(result)
     })
 })


 secretkey = 'doctorkey';
    module.exports.signup = (req,res) => {
        const { name, email, password } = req.body;
     //   const name = "doctor1"
      //  const email = 'doctor1@gmail.com';
      //  const password = 'doctor1';
      

        console.log(name);
     console.log(email);
     console.log(password);

        if(!name || !email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
    
        Doctor.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});
    
            const newUser = new Doctor({ name, email, password });
    
            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                secretkey ,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
    }
    
    module.exports.login = async (req,res) => {
      const { email , password } = req.body;
     // const email = 'doctor1@gmail.com';
       // const password = 'doctor1';
        if(!email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
        Doctor.findOne({email})
            .then(user => {
                if(!user) return res.status(400).json({msg: 'User does not exist'});
    
                // Validate password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
    
                        jwt.sign(
                            { id: user._id },
                            secretkey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    })
            })
    }
    


