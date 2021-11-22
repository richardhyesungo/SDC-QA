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
  let responseData = {};

  const getAllQuestions = () => {
    return Promise.all([
      productQuestions(req.query)
        .then((questions) => {
          responseData.questions = questions.rows;
        })
        .then(() => {
          return Promise.all(
            responseData.questions.map((question, photoIdx) => {
              return productQuestionAnswers(question.id)
                .then(async (answers) => {
                  responseData.questions[photoIdx].answers = await answers.rows;
                })
                .then(() => {
                  return Promise.all(
                    responseData.questions[photoIdx].answers.map(
                      (answer, answerIdx) => {
                        return productQuestionAnswersPhotos(answer.id).then(
                          (photos) => {
                            responseData.questions[photoIdx].answers[
                              answerIdx
                            ].photos = photos.rows;
                          }
                        );
                      }
                    )
                  );
                });
            })
          );
        }),
    ]);
  };

  getAllQuestions().then(() => {
    console.log('response data', responseData);
    res.send(responseData);
  });
});

app.post('/qa/questions', (req, res) => {
  res.sendStatus(200);
});

// answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let responseData = {};
  productQuestionAnswers(req.params.question_id)
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
