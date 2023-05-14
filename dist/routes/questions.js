const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/question.js');
const optionsSchema = require('../models/option');
const Option = mongoose.model('Option', optionsSchema);

// Create a new question
router.post('/create', async (req, res) => {
  console.log(req.body);
  try {
    const question = new Question({
      id: req.body.id,
      text: req.body.text,
      options: []
    });
    for (const option of req.body.options) {
      const newOption = new Option({
        optionid: option.optionid,
        text: option.text,
        votes: option.votes
      });
      await newOption.save();
      question.options.push(newOption);
    }

    // const newQuestion = new Question({ question });
    const savedQuestion = await question.save();
    res.status(201).json({
      question: savedQuestion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create question'
    });
  }
});
router.post('/:id/options/create', async (req, res) => {
  try {
    const question = await Question.findOne({
      id: req.params.id
    });
    if (!question) {
      return res.status(404).json({
        message: 'Question not found'
      });
    }
    const option = new Option({
      text: req.body.text,
      votes: 0,
      optionid: req.body.optionid
    });
    const savedOption = await option.save();
    question.options.push(savedOption);
    await question.save();
    res.status(201).json({
      option: savedOption
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create option'
    });
  }
});
router.delete('/:id/delete', async (req, res) => {
  try {
    const deletedQuestion = await Question.findOneAndDelete({
      id: req.params.id
    });
    if (deletedQuestion) {
      res.status(200).json({
        message: 'Question deleted successfully!'
      });
    } else {
      res.status(404).json({
        message: 'Question not found!'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete question'
    });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findOne({
      id: req.params.id
    }).lean();
    if (question) {
      const options = question.options.map(option => ({
        optionid: option.optionid,
        text: option.text,
        votes: option.votes,
        link_to_vote: `http://localhost:3000/options/${option.optionid}/add_vote`
      }));
      res.status(200).json({
        id: question.id,
        text: question.text,
        options: options
      });
    } else {
      res.status(404).json({
        message: 'Question not found!'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch question'
    });
  }
});
module.exports = router;