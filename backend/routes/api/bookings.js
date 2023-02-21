const express = require('express');
const router = express.Router();

const { requireAuth, bookingBelongsPermission, spotOwnerOrBookingOwnerPermission } = require('../../utils/auth');
const { Spot, User, Image, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { validateBooking, existsBooking, bookingPastEndDate, pastStartDate } = require('../../utils/booking-validations')

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
    // console.log('spot start', spotStart.ownerId)
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
    return next()
}


// Load all bookings
router.get('/', async (req, res, next) => {
    const bookings = await Booking.findAll({
        include: {
            model: Spot,
            include: [
                {model: User, as: 'Owner'},
                {
                    model: Image,
                    attributes: ['url']
                }
            ]
        }
    })

    return res.json(bookings)
})

// Edit a booking
router.put('/:bookingId', existsBooking, requireAuth, bookingBelongsPermission, pastStartDate, bookingPastEndDate, validateBooking, bookingConflictErr,  async (req, res, next) => {
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
