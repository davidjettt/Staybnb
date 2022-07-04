const express = require('express');
const router = express.Router();

const { Spot, User, Review, Image, sequelize } = require('../../db/models');

router.get('/:spotId', async (req, res, next) => {
    const spotAggData = await Spot.findByPk(req.params.spotId, {
        include:
        {
            model: Review,
            attributes: [
                    [
                        sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                        "avgStarRating"
                    ],
                    [ sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            ],
            // raw: true
        },

    });

    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {exclude: ['previewImage']},
        include: [{ model: Image, attributes: ['url'] },{ model: User, as: 'Owner' }]
    });

    const spotData = spot.toJSON();
    spotData.avgStarRating = spotAggData.Reviews[0].dataValues.avgStarRating
    // console.log(spotAggData.Reviews[0].dataValues.avgStarRating)
    spotData.numReviews = spotAggData.Reviews[0].dataValues.numReviews;

    if (!spot) {
        const err = new Error ("Spot couldn't be found");
        err.status = 404;
        res.status(404);
        return res.json({message: err.message, statusCode: err.status })
    }

    res.json(spotData)
})

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    res.json({ spots });
});

router.post('/spots', async (req, res, next) => {

})

module.exports = router;
