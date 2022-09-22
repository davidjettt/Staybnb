const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking } = require('../db/models');


const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

// const restoreUser = (req, res, next) => {
//     // token parsed from cookies
//     const { token } = req.cookies;
//     req.user = null;

//     return jwt.verify(token, secret, null, async (err, jwtPayload) => {
//         if (err) {
//         return next();
//         }

//         try {
//         const { id } = jwtPayload.data;
//         req.user = await User.scope('currentUser').findByPk(id);
//       } catch (e) {
//         res.clearCookie('token');
//         return next();
//       }

//       if (!req.user) res.clearCookie('token');

//       return next();
//     });
// };
const restoreUser = (req, res, next) => {
  const { token } = req.cookies
  req.user = null

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
          return next()
      }

      try {
          const { id } = jwtPayload.data
          req.user = await User.scope('currentUser').findByPk(id)
      } catch (e) {
          res.clearCookie('token')
          return next()
      }

      if (!req.user) res.clearCookie('token')

      return next()
  })

}

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
    // return _res.json({message: err.message, statusCode: err.status})
  }


// If current user isn't the owner of the spot, return an error
const spotPermission = async (req, res, next) => {
    const spot = await Spot.findOne({
      where: {
        id: req.params.spotId,
        ownerId: req.user.id
      }
    })

    if (!spot) {
      const err = new Error ('Forbidden');
      err.status = 403;
      return next(err);
    }
      return next();
}

// If current user isn't the owner of the review, return an error
const reviewPermission = async (req, res, next) => {
  const review = await Review.findOne({
    where: {
      id: req.params.reviewId,
      userId: req.user.id
    }
  })

  if (!review) {
    const err = new Error ('Forbidden');
    err.status = 403;
    return next(err);
  }

  return next();
}

// Middleware that forbids current user from making a booking if they are the onwer of the spot
const bookingPermission = async (req, res, next) => {
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId,
      ownerId: req.user.id
    }
  })

  if (spot) {
    const err = new Error ("Can't book your own spot!");
    err.status = 403;
    return next(err);
  }

  return next();
}

// Forbids the current user from editing a booking that isn't theirs
const bookingBelongsPermission = async (req, res, next) => {
  const booking = await Booking.findOne({
    where: {
      id: req.params.bookingId,
      userId: req.user.id
    }
  })

  if (!booking) {
    const err = new Error ('Forbidden');
    err.status = 403;
    return next(err);
  }

  return next();
}

// Forbids the current user from deleted a booking if they are not the owner of the spot or booking
const spotOwnerOrBookingOwnerPermission = async (req, res, next) => {
  const spot = await Spot.findOne({
      include: {
          model: Booking,
          where: {
              id: req.params.bookingId
          }
      },
      where: {
          ownerId: req.user.id
      }
  })

  const booking = await Booking.findOne({
      where: {
          id: req.params.bookingId,
          userId: req.user.id
      }
  });

  if (!booking && !spot) {
      const err = new Error ('Forbidden');
      err.status = 403;
      return next(err);
  }
  return next();
};

module.exports = {
  setTokenCookie,
  restoreUser, requireAuth,
  spotPermission, reviewPermission,
  bookingPermission,
  bookingBelongsPermission,
  spotOwnerOrBookingOwnerPermission,
}
