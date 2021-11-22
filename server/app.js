const express = require('express');
const {
  test,
  productQuestions,
  productQuestionAnswers,
  productQuestionAnswersPhotos,
} = require('./models/index');

const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.send('hello');
});

// questions
app.get('/qa/questions', (req, res) => {
  productQuestions(req.query).then((data) => res.send(data.rows));
});

app.post('/qa/questions', (req, res) => {
  res.sendStatus(200);
});

// answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let responseData = {};
  productQuestionAnswers(req.params)
    .then((answers) => {
      responseData.answers = answers.rows;
    })
    .then(() => {
      Promise.all(
        responseData.answers.map((answer, idx) => {
          return productQuestionAnswersPhotos(answer.id).then((photos) => {
            responseData.answers[idx].photos = photos.rows;
          });
        })
      ).then(() => {
        console.log('promise all console log', responseData);
        res.send(responseData);
      });
    });
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
