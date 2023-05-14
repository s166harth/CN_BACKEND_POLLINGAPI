const express = require('express');
const db = require('./src/db');
const app = express();
const port = process.env.PORT || 3000;
const questionsRoute = require('./src/routes/questions.js');
const optionsRoute = require('./src/routes/options')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/options', optionsRoute);
app.use('/questions', questionsRoute);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
