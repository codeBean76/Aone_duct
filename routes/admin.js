const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const User = require('../models/user');
const isAuth = require('../lib/isAuth');

// admin page
router.get('/', isAuth, (req, res, next) => {
  res.render('admin/index', { title: 'Admin page - Admin page' });
});

router.get('/category', isAuth, async (req, res, next) => {
  const categories = await Category.find();
  res.render('admin/category/index', { title: 'Category Manage - Admin page', categories: categories });
});

router.get('/category/new', isAuth, async (req, res, next) => {
  const categories = await Category.find();
  res.render('admin/category/new', { title: 'Category Manage - Admin page', categories: categories });
});

router.get('/category/:id', isAuth, async (req, res, next) => {
  const categories = await Category.find();
  const category = await Category.findById(req.params.id);

  res.render('admin/category/edit', { title: 'Category Manage - Admin page', categories: categories, category: category });
});

router.put('/category/:id', isAuth, async (req, res, next) => {
  // TODO: 자식이 있는 카테고리 변경시 문제 있음. refence로 교체 요망.
  const category = await Category.findById(req.params.id);

  if (!category) {
    req.flash('danger', 'Something wrong! That category is not exist!');
    return res.redirect('back');
  }

  category.name = req.body.category_title;
  category.parent = req.body.category_parent;

  await category.save();
  req.flash('success', 'Successfully updated!');
  res.redirect('/admin/category');
});

router.delete('/category/:id', isAuth, async (req, res, next) => {
  await Category.findOneAndRemove({ _id: req.params.id });
  req.flash('success', 'Successfully deleted.');
  res.redirect('/admin/category');
});

router.post('/category', isAuth, async (req, res, next) => {
  let category = await Category.findOne({ name: req.body.category_title });

  if (category) {
    req.flash('error', 'This category already exist.');
    return res.redirect('back');
  } else {
    const parent_id = await Category.findOne({ name: req.body.category_parent });
    category = new Category({
      name: req.body.category_title,
      parent: parent_id
    });
    await category.save();
    req.flash('success', 'New category saved successfully.');
    res.redirect('/admin/category');
  }
});

router.get('/user', isAuth, async (req, res, next) => {
  const users = await User.find();
  res.render('admin/user', { title: 'User Manage - Admin page', user: users });
});

module.exports = router;