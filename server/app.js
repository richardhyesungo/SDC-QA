const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// questions
app.get('/qa/questions', (req, res) => {
  res.send('Hello World!');
});

app.post('/qa/questions', (req, res) => {
  res.send('Hello World!');
});

// answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  res.send('Hello World!');
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.send('Hello World!');
});

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.send('Hello World!');
});

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  res.send('Hello World!');
});

// mark question as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.send('Hello World!');
});

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
