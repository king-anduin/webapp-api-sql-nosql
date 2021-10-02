/* eslint-disable no-undef */
const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('client', clientSchema);
