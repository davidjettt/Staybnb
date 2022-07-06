const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, reviewPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
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

// Edit a review
router.put('/:reviewId', existsReview, requireAuth, reviewPermission, validateReview, async (req, res, next) => {
    const oldReview = await Review.findByPk(req.params.reviewId);

    const { review, stars } = req.body;

    const newReview = await oldReview.update({
        userId: req.user.id,
        review,
        stars
    })

    return res.json(newReview);
});

module.exports = router;
