const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image } = require('../../db/models');


const existsImage = async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId);

    if (!image) {
        const err = new Error ("Image couldn't be found");
        err.status = 404;
        return next(err);
    }
    return next();
}

const imagePermission = async (req, res, next) => {
    const imageSpot = await Image.findOne({
        include: [
            {
                model: Spot,
                where: {
                    ownerId: req.user.id
                }
            },

        ],
        where: {
            id: req.params.imageId
        }
    })

    const imageReview = await Image.findOne({
        include: [
            {
                model: Review,
                where: {
                    userId: req.user.id
                }
            }
        ],
        where: {
            id: req.params.imageId
        }
    })


    if (!imageSpot && !imageReview) {
        const err = new Error ('Forbidden');
        err.status = 403;
        return next(err);
    }

    return next();
}

// Delete an Image
router.delete('/:imageId', existsImage, requireAuth, imagePermission, async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId);

    const { id } = req.body

    await image.destroy();

    const findSpot = await Spot.findOne({
        where: {
            id: id
        },
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
    })

    return res.json(findSpot);
})


module.exports = router;
