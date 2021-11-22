const pool = require('../db/index');

// questions
const getTenQuestions = `SELECT * FROM questions LIMIT 10`;

const test = pool.query(getTenQuestions);

test.then((data) => console.log('data here 🎃', data.rows));

// answers
const getTenAnswers = `SELECT * FROM answers LIMIT 10`;

const test2 = pool.query(getTenAnswers);

test2.then((data) => console.log('answers ⛰', data.rows));

// answers_photos
const getTenPhotos = `SELECT * FROM answers_photos LIMIT 10`;

const test3 = pool.query(getTenPhotos);

test3.then((data) => console.log('photos ⛽️', data.rows));

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

module.exports = test;
