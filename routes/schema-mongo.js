/* eslint-disable no-undef */
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  id: Number,
  name: String,
  gender: String,
});

module.exports = mongoose.model('clientSchema', clientSchema);
