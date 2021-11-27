const express = require('express');
const {
  productQuestions,
  productQuestionAnswers,
  productQuestionAnswersPhotos,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportQuestion,
  reportAnswer,
} = require('./models/index');

const pool = require('./db/index.js');

const addTable = () => {
  console.log('adding table');
  const query = {
    name: 'add-table',
    text: `CREATE TABLE IF NOT EXISTS test3 (
      id BIGSERIAL,
      product_id INTEGER,
      body VARCHAR(1000),
      date_written DATE,
      asker_name VARCHAR(100),
      asker_email VARCHAR(100),
      reported INTEGER,
      helpful INTEGER
    );`,
  };
  return pool.query(query);
};
// addTable().then((something) => console.log(something));
// getting error

const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.send('hello');
});

// get all questions for a product_id
app.get('/qa/questions', (req, res) => {
  console.log(req.query.product_id);
  let responseObject = { product_id: req.query.product_id };
  productQuestions(req.query).then(
    (data) => {
      responseObject.results = data.rows;
      res.send(responseObject);
    }
    // console.log('printing', data.rows)
  );
  // let responseData = {};

  // const getAllQuestions = () => {
  //   return Promise.all([
  //     // query product_id for all its questions
  //     productQuestions(req.query)
  //       .then((questions) => {
  //         // assign questions property to responseData with query data rows
  //         responseData.product_id = req.query.product_id;
  //         responseData.results = questions.rows;
  //       })
  //       .then(() => {
  //         return Promise.all(
  //           responseData.results.map((question, questionIdx) => {
  //             return productQuestionAnswers(question.question_id)
  //               .then(async (answers) => {
  //                 // add answer array for each question
  //                 console.log('answers should be json', answers);
  //                 responseData.results[questionIdx].answers =
  //                   await answers.rows;
  //                 // await answers.rows;
  //               })
  //               .then(() => {
  //                 return Promise.all(
  //                   responseData.results[questionIdx].answers.map(
  //                     (answer, answerIdx) => {
  //                       return productQuestionAnswersPhotos(answer.id).then(
  //                         (photos) => {
  //                           // add photo array for each answer
  //                           responseData.results[questionIdx].answers[
  //                             answerIdx
  //                           ].photos = photos.rows;
  //                         }
  //                       );
  //                     }
  //                   )
  //                 );
  //               });
  //           })
  //         );
  //       }),
  //   ]);
  // };

  // getAllQuestions().then(() => {
  //   res.send(responseData);
  // });
});

// add question for a product_id
app.post('/qa/questions', (req, res) => {
  res.sendStatus(200);
});

// get all answers for a question_id
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let responseData = {};
  productQuestionAnswers(req.params.question_id)
    .then((answers) => {
      // assign answer array results for the question
      responseData.answers = answers.rows;
    })
    .then(() => {
      Promise.all(
        responseData.answers.map((answer, idx) => {
          return productQuestionAnswersPhotos(answer.id).then((photos) => {
            // add photos array for each answer
            responseData.answers[idx].photos = photos.rows;
          });
        })
      ).then(() => {
        res.send(responseData);
      });
    });
});

// add answer to a question
app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.sendStatus(200);
});

// mark question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  markQuestionAsHelpful(req.params.question_id);
  res.sendStatus(204);
});

// report a question
app.put('/qa/questions/:question_id/report', (req, res) => {
  reportQuestion(req.params.question_id);
  res.sendStatus(204);
});

// mark answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  markAnswerAsHelpful(req.params.answer_id);
  res.sendStatus(204);
});

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  reportAnswer(req.params.answer_id);
  res.sendStatus(204);
});

console.log('test');

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
