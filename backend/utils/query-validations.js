const { handleValidationErrors } = require('./validation')
const { body } = require('express-validator')


const validateQueryFilters = [
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

module.exports = validateQueryFilters
