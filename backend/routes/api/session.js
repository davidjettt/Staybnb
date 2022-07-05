const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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
  router.get(
    '/',
    requireAuth,
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        // return res.json({
        //   user: user.toSafeObject()
        // });
        return res.json(user.toSafeObject())
      } else return res.json({});
    }
  );

  const validateLogin = [
    check('email')
      .exists({ checkFalsy: true })
      // .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];

  // const bodyValidation = (credential, password) => {
  //   console.log('TEST')
  //   if (!credential || !password) {
  //     const err = new Error ('Validation error');
  //     err.status = 400;
  //     err.errors = {email: 'Email is required', password: 'Password is required'}
  //     return res.json(err);
  //   }
  // }

const credentialCheck = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {email: email}
  })
  if (!user) {
    const err = new Error ('Invalid credentials');
        err.status = 401;
        return res.json({message: err.message, statusCode: err.status })
        // handleValidationErrors
  }
}

  // Log in
router.post(
    '/',
    // bodyValidation,
    validateLogin,
    // credentialCheck,
    async (req, res, next) => {
      const { email, password } = req.body;

      // if (!email) {
      //   const err = new Error ('Validation error');
      //   res.status(400);
      //   err.status = 400;
      //   err.errors = {email: 'Email is required'}
      //   return res.json({message: err.message, statusCode: err.status, errors: err.errors})
      // }
      // if (!password) {
      //   const err = new Error ('Validation error');
      //   err.status = 400;
      //   err.errors = {password: 'Password is required'}
      //   // return res.json({message: err.message, statusCode: err.status, errors: err.errors})
      //   next(err)
      // }


      const finduser = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {email: email}
      });

      if (!finduser) {
        const err = new Error ('Invalid credentials');
        err.status = 401;
        // return res.json({message: err.message, statusCode: err.status })
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
        // return res.json({message: err.message, statusCode: err.status })
        return next(err)
      }

      const user = await User.login({ email, password });

      // if (!user) {
      //   const err = new Error('Login failed');
      //   err.status = 401;
      //   err.title = 'Login failed';
      //   err.errors = ['The provided credentials were invalid.'];
      //   return next(err);
      // }

      const token = await setTokenCookie(res, user);
      return res.json({
        ...finduser.dataValues,
        token: token
      });
    }
  );

module.exports = router;
