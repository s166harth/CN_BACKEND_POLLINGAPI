const express = require('express');
const router = express.Router();
const Question = require('../models/question.js');

// Create a new question
router.post('/create', async (req, res) => {

    console.log(req.body);
  try {
   const question = new Question({
  text: req.body.text,
});

    // const newQuestion = new Question({ question });
    const savedQuestion = await question.save();
    res.status(201).json({ question: savedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create question' });
  }
});

module.exports = router;
