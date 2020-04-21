const mongoose = require('mongoose');

const metstuff = new mongoose.Schema({
  // _id: Number,
  // artistDisplayName: String,
  // artistDisplayBio: String,
  // title: String,
  // primaryImage: String,
  // artistGender: String,
  // objectDate: String,
  // medium: String,
  // dimensions: String,
  data: Object,
})

const Met = mongoose.model('Met', metstuff);

module.exports = Met