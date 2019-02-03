const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String },
  created: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model('User', schema);

module.exports = User;