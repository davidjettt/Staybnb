const express = require('express');
const router = express.Router();

const { Booking, User, Spot, Image } = require('../../db/models');
const {  requireAuth } = require('../../utils/auth');

router.get('/', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        include: {
            model: Spot,
            attributes: {exclude: ['createdAt', 'updatedAt']}
        },
        where: {
            userId: req.user.id
        },
        // group: 'startDate'
    });


    return res.json({ bookings });
});

module.exports = router;
