const auth = (app, passport) => {
  app.get('/signin', (req, res, next) => {
    res.render('auth/signin', { title: 'Sign In - A One' });
  });
  
  // authenticate using passport
  app.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully signed out.');
    res.redirect('/');
  });
};

module.exports = auth; 