const express = require('express');
const router = express.Router();

const { Review, User, Spot, Image } = require('../../db/models');
const {  requireAuth } = require('../../utils/auth');


// Get reviews of the current user
router.get('/', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        where: {userId: req.user.id},
        include: [
            {
                model: User
            },
            {
                model: Spot,
                attributes: {exclude: ['createdAt', 'updatedAt', 'previewImage']}
            },
            {
                model: Image,

                attributes: ['url']
            }
        ]
    })

    return res.json({reviews});
})

module.exports = router;
