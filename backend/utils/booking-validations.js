const { handleValidationErrors } = require('./validation')
const { body } = require('express-validator')
const { Booking } = require('../db/models')
const { Op } = require('sequelize')

const validateBooking = [
    body('endDate')
    .custom((value, { req }) => {
        if (value < req.body.startDate) throw new Error ('endDate cannot come before startDate')
        return true
    }),
    handleValidationErrors
]

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

    const bookingEndDate = new Date(booking.endDate)

    if (today.getTime() > bookingEndDate.getTime()) {
        const err = new Error ("Past bookings can't be modified");
        err.status = 400;
        return next(err);
    }
    return next();
}

const pastStartDate = async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId, {
        attributes: ['startDate']
    });
    const todayWithTime = new Date();

    const today = new Date(todayWithTime.getFullYear(), todayWithTime.getMonth(), todayWithTime.getDate())

    const bookingStartDate = new Date(booking.startDate)

    if (today.getTime() > bookingStartDate.getTime()) {
        const err = new Error ("Bookings that have been started can't be changed or deleted");
        err.status = 400;
        return next(err);
    }
    return next();
}

module.exports = {
    validateBooking,
    bookingConflictErr,
    existsBooking,
    bookingPastEndDate,
    pastStartDate
}
