const { handleValidationErrors } = require('./validation')
const { check } = require('express-validator')
const { Review } = require('../db/models')

const validateReview = [
    check('review')
    .custom(value => {
        if (value.trim().length === 0) throw new Error('Review text is required')
        else if (value.trim().length < 5) throw new Error('Review must be at least 5 characters long')
        else if (value.trim().length > 500) throw new Error('Review cannot exceed 500 characters')
        else return true
    }),
    check('stars')
    .custom(value => {
        if (value < 1 || value > 5 || isNaN(value)) throw new Error('You must select a star')
        return true;
    }),
    handleValidationErrors
];

const existsReview = async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        const err = new Error ("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
    return next();
}

const reviewImagesCount = async (req, res, next) => {
    const imageCount = await Image.count({
        where: {
            reviewId: req.params.reviewId
        },
        // include: {
        //     model: Review,
        //     where: {
        //         reviewId: req.params.reviewId
        //     }
        // }
    })

    if (imageCount > 10) {
        const err = new Error ('Maximum number of images for this resource was reached');
        err.status = 400;
        return next(err);
    }

    return next();
}

module.exports = {
    validateReview,
    existsReview,
    reviewImagesCount
}
