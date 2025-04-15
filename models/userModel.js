const mongoose = require('mongoose');
const { isLowercase } = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const validator = require('validator');
const { validate } = require('./tourModel');
//name, email, photo, password, passwordConfirm


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'A user must have a name']
    },
    email:{
        type: String,
        required: [true,'A user must have a email'],
        unique: true,
        isLowercase: true,
        validate:[validator.isEmail, 'please provide a valid email']
    },
    photo:{
        type: String,
       
    },
    password: {
        type: String,
        required:[true,'A user must have a password'],
    },
    passwordConfirm:{
        type:String,
        required:[true,'A user must have a password'],
        
    }
});

const User = mongoose.model('User',userSchema)

module.exports = User
