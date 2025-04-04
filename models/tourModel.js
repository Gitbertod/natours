const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']

    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    }, ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description ']
    }, description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    }, imageCover: {
        type: String,
        required: [true, 'A tour must have a image']
    }, images:[String], //aqui se genera un array de strings
    createdAt: {
        type:Date,
        default: Date.now()
    },
    startDates:[Date] //aqui se crea un array de fechas


});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;