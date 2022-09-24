const express = require('express');
const router = express.Router();

const { requireAuth, reviewPermission, bookingBelongsPermission, spotOwnerOrBookingOwnerPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateBooking = [
    body('endDate')
    .custom((value, { req }) => {
        if (value < req.body.startDate) throw new Error ('endDate cannot come before startDate')
        return true
    }),
    handleValidationErrors
]

// Middleware that checks if booking exists
const existsBooking = async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        const err = new Error ("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
    return next();
}

// Can't edit a booking that is in the past aka already happened
const bookingPastEndDate = async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId, {
        attributes: ['endDate']
    });
    const today = new Date();
    // const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();


    const bookingEndDate = new Date(booking.endDate)

    // console.log('TEST', booking.endDate);
    // console.log('TODAYS DATE', date);
    // console.log(new Date());
    // if (date > booking.dataValues.endDate[0]) {
    //     const err = new Error ("Past bookings can't be modified");
    //     err.status = 400;
    //     return next(err);
    // }
    if (today.getTime() > bookingEndDate.getTime()) {
        const err = new Error ("Past bookings can't be modified");
        err.status = 400;
        return next(err);
    }
    return next();
}

// Booking conflict middleware (NEED TO REFACTOR THIS LATER MAYBE USE "check" or "body")
const bookingConflictErr = async (req, res, next) => {

    const { startDate, endDate } = req.body;

    const spotStart = await Spot.findOne({
        include: {
            model: Booking,
            where: {
                startDate: startDate
            }
        }
    })
    const spotEnd = await Spot.findOne({
        include: {
            model: Booking,
            where: {
                endDate: endDate
            }
        }
    })
    const spotStartEnd = await Spot.findOne({
        include: {
            model: Booking,
            where: {
                [Op.and]: [{ startDate: startDate}, {endDate: endDate}]
            },
        }
    })

    if (spotStartEnd) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {startDate: 'Start date conflicts with an exiting booking',endDate: 'End date conflicts with an existing booking'};
        return next(err);
    }
    if (spotStart) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {startDate: 'Start date conflicts with an existing booking'};
        return next(err);
    }
    if (spotEnd) {
        const err = new Error ('Sorry, this spot is already booked for the specifed dates');
        err.status = 403;
        err.errors = {endDate: 'End date conflicts with an existing booking'};
        return next(err);
    }
    return next()
}






const pastStartDate = async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId, {
        attributes: ['startDate']
    });
    const today = new Date();
    // const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();


    const bookingStartDate = new Date(booking.startDate)

    // console.log('TEST', booking.startDate);
    // console.log('TEST2', testDate);
    // console.log('TODAYS DATE', date);
    // console.log(new Date());
    // if (date > booking.dataValues.endDate[0]) {
    //     const err = new Error ("Past bookings can't be modified");
    //     err.status = 400;
    //     return next(err);
    // }
    // console.log(today.getTime() > testDate.getTime())
    if (today.getTime() > bookingStartDate.getTime()) {
        const err = new Error ("Bookings that have been started can't be deleted");
        err.status = 400;
        return next(err);
    }
    return next();
}


// Load all bookings
router.get('/', async (req, res, next) => {
    const bookings = await Booking.findAll({
        include: {
            model: Spot,
            include: {
                model: User, as: 'Owner'
            }
        }
    })

    return res.json(bookings)
})

// Edit a booking
router.put('/:bookingId', existsBooking, requireAuth, bookingBelongsPermission, bookingPastEndDate, validateBooking, bookingConflictErr,  async (req, res, next) => {
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    });


    const editBooking = await booking.update({
        startDate,
        endDate
    });

    return res.json(editBooking);
});


// Delete a booking
router.delete('/:bookingId', existsBooking, requireAuth, spotOwnerOrBookingOwnerPermission, pastStartDate, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    await booking.destroy();

    return res.json({ message: 'Successfully deleted', statusCode: 200 });
});


module.exports = router;
