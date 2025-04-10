const { stack } = require("../app");
const AppError = require("../utils/appError");

const handleCastErrorDB = err =>{
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message,400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProduction = (err, res,) => {
    //Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error("ERROR!", err);

        //2) Send generic message to user
        res.status(500).json({
            status: err,
            message: 'Somenthing went very wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    //SE EVALUA SI EL ERROR ESTA EN ENTORNO DE DESARROLLO O EN PRODUCCION
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err, name:err.name};
        
        if(error.name === 'CastError') error = handleCastErrorDB(error);
        
        sendErrorProduction(error, res)
    }
}