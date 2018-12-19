const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  created: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

let Notice = mongoose.model('notices', schema);

module.exports = Notice;