const express = require('express');

const { setTokenCookie, requireAuth, correctPermission } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



  const validateSignup = [
    // check('email')
    // .custom(value => {
    //   return User.findByEmail(value).then(user => {
    //     if (user) {
    //       return Promise.reject('E-mail already in use');
    //     }
    //   });
    // }),
      // .exists({ checkFalsy: true })
      // .isEmail()
      // .withMessage('Please provide a valid email.'),
    // check('username')
    //   .exists({ checkFalsy: true })
    //   .isLength({ min: 4 })
    //   .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //   .not()
    //   .isEmail()
    //   .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post(
  '/signup',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const isUser = await User.findOne({
      where: {email: email}
    });

    if (isUser) {
      const err = new Error ('User already exists');
      err.status = 403;
      err.errors = {email: "User with that email already exists"}
      return res.json({message: err.message, statusCode: err.status, errors: err.errors})
    }

    const user = await User.signup({ firstName, lastName, email, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    });
  }
);


module.exports = router;
