const express = require('express');
const router = express.Router();

const { requireAuth, reviewPermission } = require('../../utils/auth');
const { Spot, User, Review, Image } = require('../../db/models');
const {validateReview, existsReview, reviewImagesCount} = require('../../utils/review-validations')

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
