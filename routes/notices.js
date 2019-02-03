const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

/* GET method */
router.get('/', async (req, res, next) => {
  const notices = await Notice.find();
  res.render('notice/index', { title: 'Notice - A One', notice: notices });
});

// new notice posting page
router.get('/new', (req, res, next) => {
  if (!(req.user && req.user.admin)) {
    res.redirect('/');
  } else {
    res.render('notice/new', { title: 'New Notice - A One' });
  }
});

router.post('/', async (req, res, next) => {
  let notice = new Notice({
    author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });
  await notice.save();
  req.flash('success', 'New notice uploaded successfully.');
  res.redirect('/notice');
});

module.exports = router;