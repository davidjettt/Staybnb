const express = require('express');
const router = express.Router();

const { Spot, User } = require('../../db/models');
const {  requireAuth } = require('../../utils/auth');

router.get('/', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {ownerId: req.user.id}
    })

    res.json({spots});
})

module.exports = router;
