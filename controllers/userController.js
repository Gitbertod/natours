const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel')


exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find()
    
    res.status(200).json({
        status: 'success',
        data: users
    });
})

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

exports.deleteUser = (res, req) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
}

