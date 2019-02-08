const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('/', req.user);
  res.render('index', { title: 'Express' });
});

router.get('/company', (req, res, next) => {
  res.render('company', { title: 'Company - A One' });
});

module.exports = router;