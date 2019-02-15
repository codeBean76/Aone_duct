const auth = (app, passport) => {
  app.get('/signin', (req, res, next) => {
    res.render('auth/signin', { title: 'Sign In - A One' });
  });
  
  // authenticate using passport
  app.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    successFlash: true,
    failureFlash: true
  }));

  app.get('/signout', (req, res) => {
    req.logout();
    req.flash('success', 'Successfully signed out.');
    res.redirect('/');
  });
  
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })
  );
};

module.exports = auth; 