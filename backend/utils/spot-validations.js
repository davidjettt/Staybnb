const { handleValidationErrors } = require('./validation')
const { check } = require('express-validator')
const { Spot } = require('../db/models')

const validateSpot = [
    check('address')
    .custom(value => {
        if (value.trim().length === 0) throw new Error('Address is required')
        else if (value.trim().length < 10) throw new Error('Address must be at least 10 characters long')
        else if (value.trim().length > 50) throw new Error('Address cannot exceed 50 characters')
        else return true
    }),
    check('city')
    .custom(value => {
        if (value.trim().length === 0) throw new Error('City is required')
        else if (value.trim().length < 3) throw new Error('City must be at least 3 characters long')
        else if (value.trim().length > 17) throw new Error('City cannot exceed 17 characters')
        else return true
    }),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('description')
    .custom(value => {
        if (value.trim().length === 0) throw new Error('Description is required')
        else if (value.trim().length < 10) throw new Error('Description must be at least 10 characters long')
        else if (value.trim().length > 1000) throw new Error('Descritpion cannot exeed 1000 characters')
        else return true
    }),
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
    check('lat')
    .exists({ checkFalsy: true })
    .custom(value => {
        // if (value % 1 === 0 || isNaN(value)) throw new Error ('Latitude is not valid, must be a decimal')
        if (value < -90 || value > 90 || isNaN(value)) throw new Error ('Latitude is not valid, must be a number between -90 and 90')
        return true;
    }),
    check('lng')
    .exists({ checkFalsy: true })
    .custom(value => {
        // if (value % 1 === 0 || isNaN(value)) throw new Error ('Longitude is not valid, must be a decimal')
        if (value < -180 || value > 180 || isNaN(value)) throw new Error ('Longitude is not valid, must be a number between -180 and 180')
        return true;
    }),
    check('name')
    .custom(value => {
        if (value.trim().length === 0) throw new Error ('Name is required')
        else if (value.trim().length > 50) throw new Error('Name cannot exceed 50 characters')
        return true
    }),
    check('price')
    .custom(value => {
        if (isNaN(value)) throw new Error ('Price is not valid')
        if (value < 1) throw new Error ('Price needs to be at least $1')
        return true;
    }),
    handleValidationErrors
];

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


module.exports = {
    validateSpot,
    existsSpot
}
