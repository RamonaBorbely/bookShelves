const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('passport')

router.post('/register', authController.registerNewUser)
router.get('/register', authController.renderRegister)

router.get('/login', authController.renderLogin)
router.post('/login', authController.loginUser)

router.get('/logout', authController.logout)

router.get('/resetPassword', authController.renderResetPassword)
router.post('/resetPassword', authController.resetPassword)


// down not working at the moment

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



module.exports = router 

