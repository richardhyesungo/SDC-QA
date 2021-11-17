const express = require('express');
const pool = require('./db/index');
const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');
const csv = require('fast-csv');

const questionInsertQuery = `INSERT INTO questions(
  id, product_id, body, date_written,
  asker_name, asker_email, reported,
  helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

const questionsCsv = path.join(__dirname, '..', 'csv_files', 'test.csv');

const readStream = fs
  .createReadStream(questionsCsv)
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error(error))
  .on('headers', (headers) => console.log(headers));

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
