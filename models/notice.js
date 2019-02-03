const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  created: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

schema.plugin(mongoosePaginate);
const Notice = mongoose.model('Notice', schema);

module.exports = Notice;