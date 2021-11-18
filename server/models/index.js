const pool = require('./db/index');

const questionInsertQuery = `INSERT INTO questions(
  id, product_id, body, date_written,
  asker_name, asker_email, reported,
  helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

/* pool.query(
  questionInsertQuery,
  [
    id,
    product_id,
    body,
    date_written,
    asker_name,
    asker_email,
    reported,
    helpful,
  ],
  (err, res) => {
    if (err) {
      console.log('🔴🔴🔴🔴🔴🔴🔴🔴', err);
    }
  }
); */
