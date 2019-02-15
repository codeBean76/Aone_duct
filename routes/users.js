const express = require('express');
const router = express.Router();
const User = require('../models/user');

function validateForm(form, options) {
  let email = form.email || '';
  let name = form.name || '';
  email = email.trim();
  name = name.trim();

  if (!email) {
    return 'Email is required.';
  }
  
  if (!name) {
    return 'Name is required.';
  }

  if (!form.password && options.needPassword) {
    return 'Password is required.';
  }

  if (form.password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  if (form.password !== form.password_verify) {
    return 'Passsword do not match.';
  }

  return null;
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// new account register page
router.get('/new', (req, res, next) => {
  res.render('user/new', ({ title: 'New User - A One' }));
});

// new account register process
router.post('/', async (req, res, next) => {
  let err = validateForm(req.body, { needPassword: true });
  if (err) {
    req.flash('error', err);
    return res.redirect('back');
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.facebook.id) {
      req.flash('error', 'You already logged in with facebook. Please use login with facebook.');
      return res.redirect('back');
    } else {
      req.flash('error', 'Email address already exists.');
      return res.redirect('back');
    }
  }

  user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password // TODO: Password not encrypted. Need to encrypt.
  });
  await user.save();
  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/signin');
});

module.exports = router;