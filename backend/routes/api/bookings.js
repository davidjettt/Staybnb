const express = require('express');
const router = express.Router();

const { requireAuth, reviewPermission } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


module.exports = router;
