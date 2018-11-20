const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String },
  created: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var User = mongoose.model('users', schema);

module.exports = User;