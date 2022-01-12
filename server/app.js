const pool = require('./db/index.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const path = require('path');

const redis = require('redis');
/* const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: '',
}); */
// const client = redis.createClient();
const client = redis.createClient({
  legacyMode: true,
});

client.connect();
client.on('connect', () => {
  console.log('connecting to redis');
});

client.on('ready', () => {
  console.log('connected to redis');
});

client.on('end', () => {
  console.log('redis connection disconnected');
});

client.on('reconnecting', () => {
  console.log('reconnecting to redis');
});

client.on('error', (err) => {
  console.log('Error ' + err);
});

// import db model functions that return pool promises. Use like so: exampleFunction().then().catch()
const {
  getProductQuestions,
  productQuestionAnswers,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportQuestion,
  reportAnswer,
  addProductQuestion,
  addQuestionAnswer,
  testQuery,
} = require('./models/index');

// middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log('hit');
  const searchTerm = 'testing123';
  try {
    console.log('trying');
    console.log('client', client);
    client.get(searchTerm, async (err, jobs) => {
      console.log('getting');
      if (err) throw err;

      if (jobs) {
        console.log('jobs');
        res.send(jobs);
      } else {
        console.log('no jobs');
        // const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
        client.setex(searchTerm, 600, 'helllloooooo');
        res.send('added');
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/test', (req, res) => {
  console.log('hit');
  const searchTerm = 'testing456';
  try {
    console.log('trying');
    client.get(searchTerm, async (err, jobs) => {
      console.log('getting');
      if (err) throw err;

      if (jobs) {
        console.log('jobs');
        res.send(jobs);
      } else {
        console.log('no jobs');
        // const jobs = await axios.get(`https://jobs.github.com/positions.json?search=${searchTerm}`);
        testQuery()
          .then((data) => {
            client.setex(searchTerm, 600, data.rows);
            res.send('added');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/loaderio-8b2ce2e878ae5bbf15659cfbb92c53d8.txt', (req, res) => {
  res.sendFile(path.join(__dirname, './loaderio.txt'));
});

// get all questions for a product_id
app.get('/qa/questions', (req, res) => {
  let responseObject = { product_id: req.query.product_id };
  getProductQuestions(req.query).then((data) => {
    responseObject.results = data.rows;
    res.send(responseObject);
  });
});

// add question for a product_id
app.post('/qa/questions', (req, res) => {
  const date = new Date();
  const questionDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  addProductQuestion(req.body, questionDate)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      console.log('error');
    });
});

// get all answers for a question_id
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let responseData = {
    question: req.params.question_id,
    page: req.params.page || 1,
    count: req.params.count || 5,
  };

  productQuestionAnswers(req.params.question_id).then((data) => {
    responseData.results = data.rows;
    res.send(responseData);
  });
});

// add answer to a question
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const date = new Date();
  const answerDate =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  addQuestionAnswer(req.body, answerDate)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      console.log('error', err);
    });
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
