const express = require('express');
const router = express.Router();

/* GET method */
router.get('/', (req, res, next) => {
  res.render('notice', { title: 'Notice - A One' });
});

module.exports = router;