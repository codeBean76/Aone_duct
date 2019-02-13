const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, trim: true },
  price: { type: Number },
  description: [{ type: String, trim: true }],
  stock: { type: Number },
  sellStatus: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

schema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', schema);

module.exports = Product;