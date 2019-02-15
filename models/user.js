const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  facebook: { id: String, token: String, photo: String },
  created: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model('User', schema);

module.exports = User;