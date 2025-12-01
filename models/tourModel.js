const mongoose = require('mongoose');
const slugify = require('slugify');
//const User = require('./userModel')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        // minlength: [10, 'A tour name must have more or equal then 10 characters'],
    },
    secretTour: {
        type: Boolean,
        default: false
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']

    },
    maxGroupSize: {
        type: Number,
        // required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    }, ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: { //ESTO ES UN CUSTOM VALIDATOR
        type: Number,

        // validate: {
        //     validator: function (val) {
        //         //esta validacion solo funciona con creacion de un nuevo documento
        //         return val < this.price;
        //     },
        //     message: 'Discount price ({VALUE}) sholud be below regular price'
        // }
    },
    summary: {
        type: String,
        trim: true,
        // required: [true, 'A tour must have a description ']
    }, description: {
        type: String,
        trim: true,
    }, imageCover: {
        type: String,
        // required: [true, 'A tour must have a image']
    }, images: [String], //aqui se genera un array de strings
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],//aqui se crea un array de fechas
    startLocation: {
        //GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number], //esto espera un array de numeros  
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]

}, {
    toJSON: { virtuals: true }, //propiedades virtuales, no se almacenan en la BD
    toObject: { virtuals: true },
}
);

tourSchema.index({ price: 1, ratingsAverage: -1 })
tourSchema.index({ slug: 1 })

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7
});

//Virtual populate
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
})

//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// tourSchema.pre('save',async function(next){
//     const guidesPromises = this.guides.map(async id=> await User.findById(id));
//     this.guides = await Promise.all(guidesPromises)
//     next();
// })

// tourSchema.pre('save',function(next){
//     console.log('Will save Document...')
//     next()
// })

// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// })

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    next()

    this.start = Date.now();
    next();
})
tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds`)

    next();
})

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: "-__v -PasswordChangedAt"
    })

    next()
})


//AGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
    console.log(this.pipeline());
    next()
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;