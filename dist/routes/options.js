const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/question.js');
const optionsSchema = require('../models/option');
const Option = mongoose.model('Option', optionsSchema);
router.delete('/:id/delete', async (req, res) => {
  try {
    const option = await Option.findOne({
      optionid: req.params.id
    });
    if (!option) {
      return res.status(404).json({
        message: 'Option not found'
      });
    }
    const question = await Question.findOne({
      'options.optionid': req.params.id
    });
    if (!question) {
      return res.status(404).json({
        message: 'Question not found'
      });
    }
    question.options.pull(option._id);
    await question.save();
    await option.remove();
    res.status(200).json({
      message: 'Option deleted successfully!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete option'
    });
  }
});
router.put('/:id/add_vote', async (req, res) => {
  try {
    const option = await Option.findOne({
      optionid: req.params.id
    });
    if (!option) {
      res.status(404).json({
        message: 'Option not found!'
      });
      return;
    }
    option.votes += 1;
    await option.save();
    res.status(200).json({
      message: 'Vote added successfully!',
      option
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add vote'
    });
  }
});
module.exports = router;