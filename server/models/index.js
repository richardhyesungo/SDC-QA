const pool = require('../db/index');

/*

  questions table queries

*/
const getTenQuestions = `SELECT * FROM questions LIMIT 10`;

const productQuestions = ({ product_id, page = 1, count = 5 }) => {
  let query = {
    name: 'get-questions',
    text: `SELECT * FROM questions WHERE product_id=$1`,
    values: [product_id],
  };
  return pool.query(query);
};

const test = pool.query(getTenQuestions);

// test.then((data) => console.log('data here 🎃', data.rows));

/*

  answers table queries

*/

const getTenAnswers = `SELECT * FROM answers LIMIT 10`;

const productQuestionAnswers = ({ question_id, page = 1, count = 5 }) => {
  console.log(question_id);
  let query = {
    name: 'get-question-answers',
    text: `SELECT * FROM answers WHERE question_id=$1`,
    values: [question_id],
  };
  return pool.query(query);
};

const test2 = pool.query(getTenAnswers);

// test2.then((data) => console.log('answers ⛰', data.rows));

// answers_photos
const getTenPhotos = `SELECT * FROM answers_photos LIMIT 10`;

const test3 = pool.query(getTenPhotos);

const productQuestionAnswersPhotos = (answer_id) => {
  let query = {
    name: 'get-question-answers_photos',
    text: `SELECT * FROM answers_photos WHERE answer_id=$1`,
    values: [answer_id],
  };
  return pool.query(query);
};

// test3.then((data) => console.log('photos ⛽️', data.rows));

// const getTenQuestions = `SELECT * FROM questions LIMIT 10`;

// const test = pool.query(getTenQuestions);

// const questionInsertQuery = `INSERT INTO questions(
//   id, product_id, body, date_written,
//   asker_name, asker_email, reported,
//   helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

// /* pool.query(
//   questionInsertQuery,
//   [
//     id,
//     product_id,
//     body,
//     date_written,
//     asker_name,
//     asker_email,
//     reported,
//     helpful,
//   ],
//   (err, res) => {
//     if (err) {
//       console.log('🔴🔴🔴🔴🔴🔴🔴🔴', err);
//     }
//   }
// ); */

module.exports = {
  test,
  productQuestions,
  productQuestionAnswers,
  productQuestionAnswersPhotos,
};
