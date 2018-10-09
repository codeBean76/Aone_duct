const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/company', (req, res, next) => {
  res.render('company', { title: 'Company - A One' });
});

router.get('/products', (req, res, next) => {
  res.render('products', { title: 'Products - A One' });
});

module.exports = router;