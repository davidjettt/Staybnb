const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, reviewPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
    .custom(value => {
        if (!value) throw new Error('Review text is required')
        else if (value.length < 5) throw new Error('Review must be at least 5 characters long')
        else if (value.length > 500) throw new Error('Review cannot exceed 500 characters')
        else return true
    }),
    check('stars')
    .custom(value => {
        if (value < 1 || value > 5 || isNaN(value)) throw new Error('Stars must be an integer from 1 to 5')
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


// LOAD ALL REVIEWS
router.get('/', async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [
            {
                model: User
            },
            {
                model: Image,
                attributes: ['url']
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt', 'previewImage']}
            },
        ]
    })
    return res.json({ reviews });
})

// Create image by review id
router.post('/:reviewId/images', existsReview, requireAuth, reviewPermission, reviewImagesCount, async (req, res, next) => {
    const { url } = req.body;

    const image = await Image.create({
        reviewId: req.params.reviewId,
        url
    });

    const findImage = await Image.findOne({
        where: {
            id: image.id,
            reviewId: req.params.reviewId,
            url: url
        }
    })

    const result = findImage.toJSON();
    result.imageableId = Number(req.params.reviewId);
    result.imageableType = 'Review';

    return res.json(result)
});


// Edit a review
router.put('/:reviewId', existsReview, requireAuth, reviewPermission, validateReview, async (req, res, next) => {
    const oldReview = await Review.findByPk(req.params.reviewId);

    const { review, stars } = req.body;

    const newReview = await oldReview.update({
        // userId: req.user.id,
        review,
        stars
    })

    return res.json(newReview);
});


// Delete a review
router.delete('/:reviewId', existsReview, requireAuth, reviewPermission, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    await review.destroy();

    return res.json({message: 'Successfuly deleted', statusCode: 200});
});

module.exports = router;
