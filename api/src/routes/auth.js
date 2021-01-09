const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy } = require('passport-github');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const users = require('../db/services/user');
const JWT_KEY = "something_private_and_long_enough_to_secure"

const router = express();


passport.use(new Strategy({
  clientID: '167d60aa4d7c31b784d6',
  clientSecret: '7017ef0fec5ca84096b407768c57fcfb76552054',
  callbackURL: "http://localhost:3001/auth/github/callback"
},

function (accessToken, refreshToken, profile, cb) {
  users.findOrCreate(profile);
  return cb(null, profile);
}
));


passport.use(new GoogleStrategy({
  clientID: '110250502473-e7lji9v4s50bq061c5fjjqesrcm68nlc.apps.googleusercontent.com',
  clientSecret: 'doysoisjBR_dmAGuveY1QRaL',
  callbackURL: "http://localhost:3001/auth/google/callback"
},

function (token, refreshToken, profile, cb) {
  users.findOrCreate(profile);
  return cb(null, profile);
}
));



router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('github', { scope: [], state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  next();
});

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      if (err) return next(err); ;
      res.redirect(`http://localhost:3000?token=${token}`)
    });
        
  },
);


router.get('/google', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = JSON.stringify({ redirectTo });
  const authenticator = passport.authenticate('google', { scope: 'openid profile email', state, session: true });
  authenticator(req, res, next);
}, (req, res, next) =>{
  next();
});

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res, next) => {
    const token = jwt.sign({id: req.user.id}, JWT_KEY, {expiresIn: 60 * 60 * 24 * 1000})
    req.logIn(req.user, function(err) {
      if (err) return next(err); ;
      res.redirect(`http://localhost:3000?token=${token}`)
    });
        
  },
);
module.exports = router;