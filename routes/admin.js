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
  res.render('admin/category', { title: 'Category Manage - Admin page', category: categories });
});

router.get('/user', isAuth, async (req, res, next) => {
  const users = await User.find();
  res.render('admin/user', { title: 'User Manage - Admin page', user: users });
});

module.exports = router;