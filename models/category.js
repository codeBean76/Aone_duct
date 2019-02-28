const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

schema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

const Category = mongoose.model('Category', schema);

module.exports = Category;