const mongoose = require('mongoose');
const optionsSchema = require('./option')
const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
   options: [optionsSchema],
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;