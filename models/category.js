const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  parent: { type: String }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// TODO: 부모-자식 reference 적용 요망
// schema.virtual('children', {
//   ref: 'Category',
//   localField: '_id',
//   foreignField: 'parent'
// });

const Category = mongoose.model('Category', schema);

module.exports = Category;