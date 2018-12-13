const express = require('express');
const router = express.Router();
const User = require('../models/user');

function validateForm(form, options) {
  let email = form.email || '';
  let nickname = form.nickname || '';
  email = email.trim();
  nickname = nickname.trim();

  if (!email) {
    return 'Email is required.';
  }
  
  if (!nickname) {
    return 'Nickname is required.';
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
    req.flash('error', 'Email address already exists.');
    return res.redirect('back');
  }

  let nickname = await User.findOne({ nickname: req.body.nickname });
  if (nickname) {
    req.flash('error', 'Nickname has already taken. Try another nickname.');
    return res.redirect('back');
  }

  user = new User({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password // TODO: Password not encrypted. Need to encrypt.
  });
  await user.save();
  req.flash('success', 'Registered successfully. Please sign in.');
  res.redirect('/signin');
});

module.exports = router;