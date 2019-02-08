function isAuthenticated(req, res, next) {
  if (req.user && req.user.admin) {
    next();
  } else {
    req.flash('error', 'You are not service administrator!');
    res.redirect('/');
  }
}

module.exports = isAuthenticated;