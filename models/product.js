const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, trim: true },
  price: { type: Number },
  stock: { type: Number },
  sellStatus: { type: Boolean, default: true },
  description: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

schema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', schema);

module.exports = Product;