const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const passportConfig = (passport) => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    await User.findOne({ email: email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user, { message: `Welcome ${user.email}!` }); // TODO: user.email neet to change user.nickname
    });
  }
  ));
};

module.exports = passportConfig;