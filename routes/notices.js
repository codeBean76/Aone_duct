const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

function isAuthenticated(req, res, next) {
  if (req.user && req.user.admin) {
    next();
  } else {
    req.flash('error', 'You are not service administrator!');
    res.redirect('/');
  }
}

/* GET method */
router.get('/', async (req, res, next) => {
  const notices = await Notice.find().populate('author');
  res.render('notice/index', { title: 'Notice - A One', notice: notices });
});

// new notice posting page
router.get('/new', isAuthenticated, (req, res, next) => {
  res.render('notice/new', { title: 'New Notice - A One' });
});

router.get('/:id', async (req, res, next) => {
  const notice = await Notice.findById(req.params.id).populate('author');

  res.render('notice/show', { title: 'Notice - A One', notice: notice });
});

router.get('/:id/edit', isAuthenticated, async (req, res, next) => {
  const notice = await Notice.findById(req.params.id);

  res.render('notice/edit', { title: 'Notice Edit - A One', notice: notice });
});

router.put('/:id', isAuthenticated, async (req, res, next) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    req.flash('danger', 'Something wrong! That notice is not exist!');
    return res.redirect('back');
  }

  notice.title = req.body.title;
  notice.content = req.body.content;

  await notice.save();
  req.flash('success', 'Successfully updated!');
  res.redirect('/notice');
});

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  await Notice.findOneAndRemove({ _id: req.params.id });
  req.flash('success', 'Successfully deleted.');
  res.redirect('/notice');
});

router.post('/', async (req, res, next) => {
  const notice = new Notice({
    author: req.user._id,
    title: req.body.title,
    content: req.body.content
  });
  await notice.save();
  req.flash('success', 'New notice uploaded successfully.');
  res.redirect('/notice');
});

module.exports = router;