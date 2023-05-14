const mongoose = require('mongoose');
const optionsSchema = new mongoose.Schema({
  optionid: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});
module.exports = optionsSchema;