const mongoose = require('mongoose');
const { isLowercase } = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const validator = require('validator');
const { validate } = require('./tourModel');
const bcrypt = require('bcryptjs');
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
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,'A user must have a password'],
        validate:{
            //This only works on SAVE!!!
            validator:function(el){
                return el === this.password
            },message:"Passwords are not the same"
        }  
    }
});

userSchema.pre('save',async function(next){
    //Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    
    //Hash de pasword with cost of 12
    this.password = await bcrypt.hash(this.password,12);
    
    //delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User',userSchema)

module.exports = User
