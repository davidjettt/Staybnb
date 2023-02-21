const express = require('express');
const router = express.Router();

const { requireAuth, spotPermission, bookingPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking } = require('../../db/models');
const { singlePublicFileUpload, multiplePublicFileUpload, singleMulterUpload, multipleMulterUpload } = require('../../awsS3');
const { validateSpot, existsSpot } = require('../../utils/spot-validations')
const { validateReview } = require('../../utils/review-validations')
const { validateBooking, bookingConflictErr } = require('../../utils/booking-validations')
const validateQueryFilters = require('../../utils/query-validations')

const { Op } = require('sequelize');

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


// Create an image by spot id
router.post('/:spotId/images', requireAuth, singleMulterUpload('image'), async (req, res, next) => {
    const url = await singlePublicFileUpload(req.file)

    const image = await Image.create({
        spotId: req.params.spotId,
        url
    });

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: Image,
                attributes: ['url', 'id']
            },
            {
                model: User, as: 'Owner'
            }
        ]
    });

    return res.json(spot)
})

// Spot Image upload multiple
router.post('/:spotId/images/multiple', requireAuth, multipleMulterUpload('images'), async (req, res, next) => {
    const urls = await multiplePublicFileUpload(req.files)

    // console.log('URL', url)
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i]
        const image = await Image.create({
            spotId: req.params.spotId,
            url
        });
    }


    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: Image,
                attributes: ['url']
            },
            {
                model: User, as: 'Owner'
            }
        ]
    });

    return res.json(spot)
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
        const err = new Error ('You can only have one review per spot');
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
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: Image,
                attributes: ['url', 'id']
            },
            {
                model: User, as: 'Owner'
            }
        ],
    });

    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

    const updatedSpot = await spot.update({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        latitude: Number(lat),
        longitude: Number(lng),
        name,
        description,
        pricePerNight: Number(price),
        previewImage
    });
    return res.json(spot);
});


// Delete spot by Id
router.delete('/:spotId', existsSpot, requireAuth, spotPermission, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    await spot.destroy();

    return res.json({message: "Successfuly deleted", statusCode: 200});
})



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

    where = {
        ...latQuery,
        ...lngQuery,
        ...priceQuery
    };

    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: ['stars']
            },
            {
                model: Image,
                attributes: ['url', 'id']
            },
            {
                model: User, as: 'Owner'
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
    const { address, city, state, country, lat, lng, name, description, price } = req.body;


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
    })

    res.status(201);
    return res.json(newSpot);
})


module.exports = router;
