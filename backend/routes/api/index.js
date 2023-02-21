const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const SpotsRouter = require('./spots.js');
const yourSpotsRouter = require('./your-spots.js');
const yourReviewsRouter = require('./your-reviews.js');
const reviewsRouter = require('./reviews.js');
const yourBookingsRouter = require('./your-bookings.js');
const bookingsRouter = require('./bookings.js');
const imagesRouter = require('./images.js');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', SpotsRouter);
router.use('/your-spots', yourSpotsRouter);
router.use('/your-reviews', yourReviewsRouter);
router.use('/reviews', reviewsRouter);
router.use('/your-bookings', yourBookingsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);

module.exports = router;
