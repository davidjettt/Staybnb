const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth, reviewPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const imagePermission = async (req, res, next) => {

}



router.get('/:imageId', requireAuth, async (req, res, next) => {

})


module.exports = router;
