require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user')

// local
passport.use(User.createStrategy())


// google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8001/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, {name: profile.displayName, email: profile.emails[0].value}, function (err, user) {
    return cb(err, user);
  });
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

passport.deserializeUser(async (id, done) => {
    try{
        const user =  await User.findById(id) 
        done(null, user)
    } catch(err) {
        done(err)
    }
  });



module.exports = passport

// these are copied from https://www.passportjs.org/concepts/authentication/sessions/
// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, {
//         id: user.id,
//       });
//     });
//   });
  
//   passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//       return cb(null, user);
//     });
//   });