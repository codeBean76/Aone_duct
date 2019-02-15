const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const facebookCredentials = require('../config/facebook.json');

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
      if (user.facebook.id) {
        return done(null, false, { message: 'You signed up with facebook. Please use login with facebook.'})
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user, { message: `Welcome ${user.name}!` });
    });
  }));

  facebookCredentials.profileFields = ['email', 'name', 'picture', 'displayName'];
  passport.use(new FacebookStrategy(facebookCredentials, 
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : '';
        let photo = (profile.photos && profile.photos[0]) ? profile.photos[0].value : '';
        let name = (profile.displayName) ? profile.displayName : [profile.name.familyName, profile.name.givenName].filter(e => e).join('');

        // Is there any user have same facebook id?
        let user = await User.findOne({ 'facebook.id': profile.id });
        
        // If not, is there any user have same email address?
        if (!user) {
          user = await User.findOne({ email: email });

          // If neither of them, then make one.
          if (!user) {
            user = new User({
              name: name,
              email: email
            });
          }
        }
        user.facebook.id = profile.id;
        user.facebook.photo = photo;
        user.facebook.token = profile.token;

        await user.save();
        return done(null, user, { message: `Welcome ${user.name}!` });
      } catch (err) {
        done(err);
      }
    }
  ));
};

module.exports = passportConfig;