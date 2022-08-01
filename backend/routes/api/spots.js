const express = require('express');
const router = express.Router();

const { requireAuth, spotPermission, bookingPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

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
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
    check('lat')
    .exists({ checkFalsy: true })
    .custom(value => {
        if (value % 1 === 0 || isNaN(value)) throw new Error ('Latitude is not valid, must be a decimal')
        return true;
    }),
    check('lng')
    .exists({ checkFalsy: true })
    .custom(value => {
        if (value % 1 === 0 || isNaN(value)) throw new Error ('Longitude is not valid, must be a decimal')
        return true;
    }),
    check('name')
    .custom(value => {
        if (!value) throw new Error ('Name is required')
        else if (value.length >= 50) throw new Error ('Name must be less than 50 characters')
        return true
    }),
    check('price')
    .custom(value => {
        if (isNaN(value)) throw new Error ('Price is not valid')
        return true;
    }),
    handleValidationErrors
];

const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('stars')
    .custom(value => {
        if (value < 1 || value > 5 || isNaN(value)) throw new Error('You must select a star')
        return true;
    }),
    handleValidationErrors
];

const validateBooking = [
    body('endDate')
    .custom((value, { req }) => {
        if (value < req.body.startDate) throw new Error ('endDate cannot come before startDate')
        return true
    }),
    handleValidationErrors
]

// Middleware that checks if spot exists
const existsSpot = async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error ("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
    return next();
}


// Get all bookings by spot id
router.get('/:spotId/bookings', existsSpot, requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (req.user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({ bookings });
    }

    const bookings = await Booking.findAll({
        include: {
            model: User
        },
        where: { spotId: req.params.spotId },
    })

    return res.json({ bookings });

});

// Booking conflict middleware (NEED TO REFACTOR THIS LATER MAYBE USE "check" or "body")
const bookingConflictErr = async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const bookingStart = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            startDate: startDate
        },
    });
    const bookingEnd = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            startDate: endDate
        },
    });
    const bookingStartEnd = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            [Op.and]: [{ startDate: startDate}, {endDate: endDate}]
        },
    });

    if (bookingStartEnd) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {startDate: 'Start date conflicts with an exiting booking',endDate: 'End date conflicts with an existing booking'};
        return next(err);
    }
    if (bookingStart) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {startDate: 'Start date conflicts with an existing booking'};
        return next(err);
    }
    if (bookingEnd) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {endDate: 'End date conflicts with an existing booking'};
        return next(err);
    }
    return next()
}

// Create an image by spot id
router.post('/:spotId/images', existsSpot, requireAuth, spotPermission, async (req, res, next) => {
    const { url } = req.body;

    const image = await Image.create({
        spotId: req.params.spotId,
        url
    });
    // const image2 = image.toJSON();
    // image2.imageableId = req.params.spotId;
    // image2.imageableType = 'Spot';

    // const find = await Image.findByPk(req.params.spotId, {
    //     attributes: []
    // })
    const findImage = await Image.findOne({
        where: {
            id: image.id,
            spotId: req.params.spotId,
            url: url
        }
    })

    const result = findImage.toJSON();
    result.imageableId = Number(req.params.spotId);
    result.imageableType = 'Spot';

    return res.json(result)
})


// Create booking by spot id
router.post('/:spotId/bookings', existsSpot, requireAuth, bookingPermission, validateBooking, bookingConflictErr, async (req, res, next) => {
    // const spot = await Spot.findByPk(req.params.spotId);

    const { startDate, endDate } = req.body;

    const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: Number(req.params.spotId),
        startDate,
        endDate
    });

    return res.json(newBooking);
});

// Get all reviews by Spot id
router.get('/:spotId/reviews', existsSpot, async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [
            {
                model: User
            },
            {
                model: Image,
                attributes: ['url']
            }
        ],
        where: {spotId: req.params.spotId}
    })

    return res.json({ reviews });
});


// Create a review for spot by spot id
router.post('/:spotId/reviews', existsSpot, requireAuth, validateReview, async (req, res, next) => {
    const existingReview = await Review.findOne({
        where: {spotId: req.params.spotId, userId: req.user.id}
    });

    if (existingReview) {
        const err = new Error ('User already has a review for this spot');
        err.status = 403;
        return next(err);
    }

    const { review, stars } = req.body;

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: Number(req.params.spotId),
        review,
        stars
    });

    return res.json(newReview);
});

// Get spot by Id
router.get('/:spotId', existsSpot, async (req, res, next) => {
    // const spotAggData = await Spot.findByPk(req.params.spotId, {
    //     include:
    //     {
    //         model: Review,
    //         attributes: [
    //                 [
    //                     sequelize.fn("AVG", sequelize.col("Reviews.stars")),
    //                     "avgStarRating"
    //                 ],
    //                 [ sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
    //         ],
    //         // raw: true
    //     },
    // });

    const countReviews = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    });

    const sumReviews = await Review.sum('stars', {
        where: {
            spotId: req.params.spotId
        }
    })

    const spot = await Spot.findByPk(req.params.spotId, {
        // attributes: {exclude: ['previewImage']},
        include: [{ model: Image, attributes: ['url'] },{ model: User, as: 'Owner' }]
    });

    const spotData = spot.toJSON();
    // spotData.avgStarRating = spotAggData.Reviews[0].dataValues.avgStarRating;
    // spotData.numReviews = spotAggData.Reviews[0].dataValues.numReviews;
    spotData.avgStarRating = sumReviews / countReviews;
    spotData.numReviews = countReviews;
    // console.log(spotAggData.Reviews[0].dataValues.avgStarRating)

    return res.json(spotData)
});

// Edit spot by Id
router.put('/:spotId', existsSpot, requireAuth, spotPermission, validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // if (req.user.id !== spot.ownerId) {
    //     const err = new Error ("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;


    // const isExistingLatLng = await Spot.findOne({
    //     where: {
    //         [Op.and]: [{address: address}, {city: city}, {state: state}, {latitude: lat}, {longitude: lng}]
    //     }
    // });

    // if (isExistingLatLng) {
    //     const err = new Error ('Combination of longitude and latitude coordinates already exists');
    //     err.status = 403;
    //     return next(err)
    // }

    const updatedSpot = await spot.update({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        latitude: lat,
        longitude: lng,
        name,
        description,
        pricePerNight: price,
        previewImage
    });
    // console.log('UPDATED SPOT', updatedSpot)
    // const updatedSpot2 = await Spot.findOne({where: {address: address}, attributes: {exclude: ['previewImage']}})
    return res.json(spot);
});


// Delete spot by Id
router.delete('/:spotId', existsSpot, requireAuth, spotPermission, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // if (req.user.id !== spot.ownerId) {
    //     const err = new Error ("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    await spot.destroy();

    return res.json({message: "Successfuly deleted", statusCode: 200});
})

const validateQueryFilters = [
    // check('page')
    // .custom(value => {
    //     if (value < 0) throw new Error ('Page must be greater than or equal to 0')
    //     return true;
    // }),
    // check('size')
    // .custom(value => {
    //     if (value < 0) throw new Error ('Size must be greater than or equal to 0')
    //     return true;
    // }),
    body('page')
    .custom((value, { req }) => {
        if (req.query.page < 0) throw new Error ('Page must be greater than or equal to 0')
        return true
    }),
    body('size')
    .custom((value, { req }) => {
        if (req.query.size < 0) throw new Error ('Size must be greater than or equal to 0')
        return true
    }),
    body('minLat')
    .custom((value, { req }) => {
        if (req.query.minLat % 1 === 0 ) throw new Error ('Minimum latitude is invalid')
        return true
    }),
    body('maxLat')
    .custom((value, { req }) => {
        if (req.query.maxLat % 1 === 0 ) throw new Error ('Maximum latitude is invalid')
        return true
    }),
    body('minLng')
    .custom((value, { req }) => {
        if (req.query.minLng % 1 === 0 ) throw new Error ('Minimum longitude is invalid')
        return true
    }),
    body('maxLng')
    .custom((value, { req }) => {
        if (req.query.maxLng % 1 === 0 ) throw new Error ('Maximum longitude is invalid')
        return true
    }),
    body('minPrice')
    .custom((value, { req }) => {
        // if (req.query.minPrice % 1 === 0 ) throw new Error ('Minimum price is invalid')
        if (Number(req.query.minPrice) < 0 ) throw new Error ('Minimum price must be greater than 0')
        return true
    })
    .custom((value, { req }) => {
        if (Number(req.query.minPrice) % 1 === 0 ) throw new Error ('Minimum price is invalid')
        return true
    }),
    body('maxPrice')
    .custom((value, { req }) => {
        // if (req.query.maxPrice % 1 === 0 ) throw new Error ('Maximum price is invalid')
        if (Number(req.query.maxPrice) < 0 ) throw new Error ('Maximum price must be greater than 0')
        return true
    })
    .custom((value, { req }) => {
        if (Number(req.query.maxPrice) % 1 === 0 ) throw new Error ('Maximum price is invalid')
        return true
    }),
    handleValidationErrors
]

// Get all spots & Query Filters
router.get('/', validateQueryFilters, async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let where = {};

    // let pagination = {};

    if (minLat && maxLat) {
        var latQuery = {
            latitude: {
                [Op.gte]: minLat,
                [Op.lte]: maxLat
            }
        }
    }

    if (minLng && maxLng) {
        var lngQuery = {
            longitude: {
                [Op.gte]: minLng,
                [Op.lte]: maxLng
            }
        }
    }

    if (minPrice && maxPrice) {
        var priceQuery = {
            pricePerNight: {
                [Op.gte]: Number(minPrice),
                [Op.lte]: Number(maxPrice)

            }
        }
    }

    page = parseInt(page);
    size = parseInt(size);

    if (isNaN(page)) page = 0;
    if (isNaN(size)) size = 20;

    if (page === 0) page = 1;
    if (size > 20) size = 20;
    if (page > 10) page = 10;

    // if (page >= 0) {

    // }

    where = {
        ...latQuery,
        ...lngQuery,
        ...priceQuery
    };
    // console.log(where)
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']
            }
        ],
        where,
        limit: size,
        offset: size * (page - 1)
    });

    return res.json({
        spots,
        page: page,
        size: size
    });
});


// Create new spot
router.post('/',requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;


    const isExistingLatLng = await Spot.findOne({
        where: {
            [Op.and]: [{address: address}, {city: city}, {state: state}, {latitude: lat}, {longitude: lng}]
        }
    });
    if (isExistingLatLng) {
        const err = new Error ('Combination of address, city, state, longitude, latitude coordinates for a spot already exists');
        err.status = 403;
        return next(err)
    }

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        latitude: lat,
        longitude: lng,
        name,
        description,
        pricePerNight: price,
        previewImage
    })

    // const newSpot2 = await Spot.findOne({where: {address: address}, attributes: {exclude: ['previewImage']}})
    res.status(201);
    return res.json(newSpot);
})

module.exports = router;
