const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Please enter name"]
    },
    phoneno : {
        type : Number , 
        required : [true , "Please enter Phoneno."],
        length : [ 10 , "Please Enter a valid Number"]
    },
    date: {
        type: Date,
      },
     time: {
       type: Date,
      },
      age: {
        type: Number,
        required: true,
      },
      status: {
        pending: {
          type: Boolean,
          default: true,
        },
        done: {
          type: Boolean,
          default: false,
        },
        rejected: {
          type: Boolean,
          default: false,
        }
      },
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", //logged user ko id
      },
      assignedDoctor:[ {
       name : {
        type : String
       },
       Specialization : {
        type : String
       },
       Date : {
        type : Date
       }

      },
    ],
    disease : [{
        type : String
               }],
    Symptoms :[{
        type : String
               }],
    medicines: [
        {
         medicinesname : {
           type: String,
         },
         quantity : {
            type: Number,

          },
     
        }
    
      ],
      bookedAt: {
        type: Date,
        default: Date.now
    }
});

const Appoinment = mongoose.model('Appoinment', AppoinmentSchema)

module.exports = Appoinment