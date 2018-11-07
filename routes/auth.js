const express = require('express');
const router = express.Router();

router.get('/signin', (req, res, next) => {
  res.render('auth/signin', { title: 'Sign In - A One' });
});

// TODO: Need to add '/signin' post method.

module.exports = router;