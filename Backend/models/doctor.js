const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('doctor', doctorSchema)

module.exports = Doctor