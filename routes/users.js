const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

// new account register page
router.get('/new', (req, res, next) => {
  res.render('user/new', ({ title: 'New User - A One' }));
});

// TODO: Need to add '/new' post method.

module.exports = router;