const express = require('express');

const { setTokenCookie, restoreUser, requireAuthentication } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const router = express.Router();





// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );



  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
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
  const { credential, password } = req.body;
  const user = await User.findOne({
    where: {username: credential}
  })
  if (!user) {
    const err = new Error ('Invalid credentials');
        err.status = 401;
        // res.json({message: err.message, statusCode: err.status })
        handleValidationErrors
  }
}

  // Log in
router.post(
    '/',
    // bodyValidation,
    // validateLogin,
    credentialCheck,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      const finduser = await User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {username: credential}
      });

      // if (!user) {
      //   const err = new Error('Login failed');
      //   err.status = 401;
      //   err.title = 'Login failed';
      //   err.errors = ['The provided credentials were invalid.'];
      //   return next(err);
      // }

      if (!credential || !password) {
        const err = new Error ('Validation error');
        err.status = 400;
        err.errors = {email: 'Email is required', password: 'Password is required'}
        return res.json({message: err.message, statusCode: err.status, errors: err.errors})
      }

      const token = await setTokenCookie(res, user);
      return res.json({
        ...finduser.dataValues,
        token: token
      });
    }
  );

module.exports = router;
