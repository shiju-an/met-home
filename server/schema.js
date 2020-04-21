const mongoose = require('mongoose');

const metstuff = new mongoose.Schema({
  _id: Number,
  artistDisplayName: String,
  artistDisplayBio: String,
  title: String,
  primaryImage: Number,
  artistGender: Number,
  objectDate: Number,
  medium: Number,
  dimensions: Number,
})

const Met = mongoose.model('Met', metstuff);

module.exports = Met