const express = require('express');
const test = require('./models/index');

const app = express();
const port = 5001;

app.get('/', (req, res) => {
  // console.log('tessttttt', test);
  // res.send('hello');
  test
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

// questions
app.get('/qa/questions', (req, res) => {
  res.send('hello!');
  res.sendStatus(200);
});

app.post('/qa/questions', (req, res) => {
  res.sendStatus(200);
});

// answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  res.sendStatus(200);
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.sendStatus(200);
});

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.sendStatus(200);
});

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  res.sendStatus(200);
});

// mark question as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.sendStatus(200);
});

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
