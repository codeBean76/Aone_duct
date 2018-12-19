const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

/* GET method */
router.get('/', async (req, res, next) => {
  const notices = await Notice.find();
  res.render('notice/index', { title: 'Notice - A One', notice: notices });
});

module.exports = router;