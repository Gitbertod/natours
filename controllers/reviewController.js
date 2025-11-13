const Review = require('./../models/reviewModel')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')


exports.getAllReview = catchAsync(async (req, res, next) => {
    let filter = {}
    if(req.params.tourId) filter = {tour:req.params.tourId}

    const reviews = await Review.find(filter)
    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews
        }
    })
})

exports.createReview = catchAsync(async (req, res, next,) => {
    //permite rutas anidadas
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newReview
    })
})

exports.deleteReview = factory.deleteOne(Review)


// exports.deleteTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndDelete(req.params.id)

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     });
// })