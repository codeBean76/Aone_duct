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
  const categories = await Category.find().populate('children');
  res.render('admin/category/index', { title: 'Category Manage - Admin page', categories: categories });
});

router.get('/category/new', isAuth, async (req, res, next) => {
  const categories = await Category.find().populate('children');
  res.render('admin/category/new', { title: 'Category Manage - Admin page', categories: categories });
});

router.get('/category/:id', isAuth, async (req, res, next) => {
  const categories = await Category.find().populate('children');
  const category = await Category.findById(req.params.id).populate('parent');

  res.render('admin/category/edit', { title: 'Category Manage - Admin page', categories: categories, category: category });
});

router.put('/category/:id', isAuth, async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    req.flash('danger', 'Something wrong! That category is not exist!');
    return res.redirect('back');
  }

  category.name = req.body.category_title;
  const parent_id = await Category.findOne({ name: req.body.category_parent });
  category.parent = parent_id;

  await category.save();
  req.flash('success', 'Successfully updated!');
  res.redirect('/admin/category');
});

router.delete('/category/:id', isAuth, async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate('children');
  if (category.children.length !== 0) {
    req.flash('error', 'There are children in that category. Please delete them first.');
    res.redirect('/admin/category');
  } else {
    await Category.findOneAndRemove({ _id: req.params.id });
    req.flash('success', 'Successfully deleted.');
    res.redirect('/admin/category');
  }
});

router.post('/category', isAuth, async (req, res, next) => {
  let category = await Category.findOne({ name: req.body.category_title });
  if (category) {
    req.flash('error', 'This category already exist.');
    return res.redirect('back');
  }
  if (req.body.category_parent) {
    let parent = await Category.findOne({ name: req.body.category_parent });
    if (!parent) {
      req.flash('error', 'Parent not exist.');
      return res.redirect('back');
    }
    category = new Category({
      name: req.body.category_title,
      parent: parent._id
    });
  } else {
    category = new Category({
      name: req.body.category_title,
    });
  }

  await category.save();
  req.flash('success', 'New category saved successfully.');
  res.redirect('/admin/category');
});

router.get('/user', isAuth, async (req, res, next) => {
  const users = await User.find();
  res.render('admin/user', { title: 'User Manage - Admin page', user: users });
});

module.exports = router;