const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const bcrypt = require('bcryptjs');

const router = express.Router();

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );


// Get the current user
  // router.get(
  //   '/',
  //   // requireAuth,
  //   restoreUser,
  //   (req, res) => {
  //     const { user } = req;
  //     // const {token} = req.cookies.token
  //     if (user) {
  //       // return res.json({
  //       //   user: user.toSafeObject()
  //       // });
  //       return res.json(user.toSafeObject())
  //     } else return null;
  //   }
  // );

router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  const token = req.cookies.token;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
      token,
    });
  }

  return res.json({});
});

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];


  // Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { email, password } = req.body;

      const finduser = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {email: email}
      });

      if (!finduser) {
        const err = new Error ('Invalid credentials');
        err.status = 401;
        return next(err)
      }

      const test = await User.scope('loginUser').findOne({
        where: {
            email: email
        }
      });

      if (!bcrypt.compareSync(password, test.dataValues.hashedPassword.toString())) {
        const err = new Error ('Invalid credentials');
        err.status = 401;
        return next(err)
      }

      const user = await User.login({ email, password });

      const token = await setTokenCookie(res, user);

      return res.json({
        user: finduser.dataValues,
        token: token
      });
    }
  );

module.exports = router;
