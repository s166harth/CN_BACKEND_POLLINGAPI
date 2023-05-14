const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  }
});
const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;