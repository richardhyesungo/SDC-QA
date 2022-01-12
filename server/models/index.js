const pool = require('../db/index');

/*

        QUESTIONS TABLE QUERIES

*/

// query to get all questions related to product_id
const getProductQuestions = ({ product_id, page = 1, count = 5 }) => {
  const query = {
    name: 'get-questions',
    text: `
      select
          q.question_id,
          q.question_body,
          q.question_date,
          q.asker_name,
          q.helpful as question_helpfulness,
          case when q.reported > 0 then true else false end as reported,
          jsonb_object_agg(
                a.id,
                json_build_object(
                  'id', a.id,
                  'body', a.body,
                  'date', a.date_written,
                  'answerer_name', a.answerer_name,
                  'helpfulness', a.helpful,
                  'photos', (
                    select ARRAY(
                      SELECT json_build_object('id', ap.id, 'url', ap.url)
                      from answers_photos as ap
                      where ap.answer_id = a.id
                      )
                    )
                  )
          ) as answers
      from answers as a
      inner join questions as q
      on q.question_id = a.question_id
      where q.product_id=$1
      group by 1;`,
    values: [product_id],
  };
  return pool.query(query);
};

const testQuery = () => {
  const query = {
    name: 'test',
    text: `
      select * from questions limit 1;`,
  };
  return pool.query(query);
};

const addProductQuestion = (
  { body, name, email, product_id },
  questionDate
) => {
  const query = {
    name: 'add-question',
    text: `
      insert into questions(
        product_id, question_body, asker_name, asker_email, question_date, reported, helpful
        )
      values($1, $2, $3, $4, $5, $6, $7);
      `,
    values: [product_id, body, name, email, questionDate, 0, 0],
  };
  return pool.query(query);
};

/*

        answers table queries

*/

// query to get all answers related to question
const productQuestionAnswers = (question_id, page = 1, count = 5) => {
  const query = {
    name: 'get-question-answers',
    text: `
        select
            a.id as answer_id,
            a.body,
            a.date_written as date,
            a.answerer_name,
            a.helpful as helpfulness,
            (
              select ARRAY(
                SELECT json_build_object('id', ap.id, 'url', ap.url)
                from answers_photos as ap
                where ap.answer_id = a.id
                )
            ) as photos
        from answers as a
        where a.question_id = $1;
    `,
    values: [question_id],
  };
  return pool.query(query);
};

// add an answer
const addQuestionAnswer = ({ body, name, email, question_id }, answerDate) => {
  const query = {
    name: 'add-answer',
    text: `
      insert into answers(
        question_id, body, answerer_name, answerer_email, date_written, reported, helpful
        )
      values($1, $2, $3, $4, $5, $6, $7);
      `,
    values: [question_id, body, name, email, answerDate, 0, 0],
  };
  return pool.query(query);
};

/*

        UPDATE QUERIES

*/
// questions and answers tables -> helpful and reported -> increment and decrement
const markQuestionAsHelpful = (question_id) => {
  const query = {
    name: '',
    text: `UPDATE questions SET helpful = helpful + 1 where question_id = $1`,
    values: [question_id],
  };
  pool.query(query);
};

const reportQuestion = (question_id) => {
  const query = {
    name: '',
    text: `UPDATE questions SET reported = reported + 1 where question_id = $1`,
    values: [question_id],
  };
  pool.query(query);
};

const markAnswerAsHelpful = (id) => {
  const query = {
    name: '',
    text: `UPDATE answers SET helpful = helpful + 1 where id = $1`,
    values: [id],
  };
  pool.query(query);
};

const reportAnswer = (id) => {
  const query = {
    name: '',
    text: `UPDATE answers SET reported = reported + 1 where id = $1`,
    values: [id],
  };
  pool.query(query);
};

module.exports = {
  addProductQuestion,
  productQuestionAnswers,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportQuestion,
  reportAnswer,
  getProductQuestions,
  addQuestionAnswer,
  testQuery,
};
