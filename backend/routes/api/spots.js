const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, correctPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    check('pricePerNight')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
    check('latitude')
    .exists({ checkFalsy: true })
    .custom(value => {
        if (value % 1 === 0) throw new Error ('Latitude is not valid')
        return true;
    }),
    check('longitude')
    .exists({ checkFalsy: true })
    .custom(value => {
        if (value % 1 === 0) throw new Error ('Longitude is not valid')
        return true;
    }),
    check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 49 })
    .withMessage('Name must be less than 50 characters'),
    handleValidationErrors
];

// Get spot by Id
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

    // console.log(spotAggData);

    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {exclude: ['previewImage']},
        include: [{ model: Image, attributes: ['url'] },{ model: User, as: 'Owner' }]
    });

    if (!spot) {
        const err = new Error ("Spot couldn't be found");
        err.status = 404;
        return next(err)
    }

    const spotData = spot.toJSON();
    spotData.avgStarRating = spotAggData.Reviews[0].dataValues.avgStarRating;
    spotData.numReviews = spotAggData.Reviews[0].dataValues.numReviews;
    // console.log(spotAggData.Reviews[0].dataValues.avgStarRating)

    res.json(spotData)
});


// Edit spot by Id
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error ("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (req.user.id !== spot.ownerId) {
        const err = new Error ("Forbidden");
        err.status = 403;
        return next(err);
    }

    const { address, city, state, country, latitude, longitude, name, description, pricePerNight } = req.body;

    const updatedSpot = await spot.update({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        latitude,
        longitude,
        name,
        description,
        pricePerNight
    });

    res.json(updatedSpot);
});


// Delete spot by Id
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (req.user.id !== spot.ownerId) {
        const err = new Error ("Forbidden");
        err.status = 403;
        return next(err);
    }

    if (!spot) {
        const err = new Error ("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    await spot.destroy();

    res.json({message: "Successfuly deleted", statusCode: 200});
})

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    res.json({ spots });
});


// Create new spot
router.post('/',requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, latitude, longitude, name, description, pricePerNight } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        latitude,
        longitude,
        name,
        description,
        pricePerNight
    })
    res.status(201);
    res.json(newSpot);
})

module.exports = router;
