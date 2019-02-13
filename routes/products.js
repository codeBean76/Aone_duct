const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const isAuth = require('../lib/isAuth');

// products list page
router.get('/', async (req, res, next) => {
  const products = await Product.find();
  res.render('product/index', { title: 'Product - A One', product: products });
});

// product register page
router.get('/new', (req, res, next) => {
  res.render('product/new', { title: 'New Product - A One '});
});

router.get('/:id', async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.render('product/show', { title: product.name + ' - A One', product: product });
});

router.post('/', async (req, res, next) => {
  const product = new Product({
    name: req.body.product_name,
    thumbnail: req.body.thumbnail, // TODO: This is temperary measure. Need to fix.
    price: req.body.price,
    description: req.body.description.split(' ').map(e => e.trim()),
    stock: req.body.stock
  });
  await product.save();
  req.flash('success', 'New product uploaded successfully.');
  res.redirect('/product');
});

module.exports = router;