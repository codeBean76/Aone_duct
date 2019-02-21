const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const isAuth = require('../lib/isAuth');

// admin page
router.get('/', isAuth, (req, res, next) => {
  res.render('admin/index', { title: 'Admin page - Admin page' });
});

router.get('/category', isAuth, async (req, res, next) => {
  const categories = await Category.find();
  res.render('admin/category', { title: 'Category Manage - Admin page', category: categories });
});

module.exports = router;