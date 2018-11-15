const LocalStrategy = require('passport-local').Strategy;

const passportConfig = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
    console.log('LocalStrategy', username, password);
    // TODO: Need to connect with mongodb using mongoose.
  }
  ));
};

module.exports = passportConfig;