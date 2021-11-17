const express = require('express');
const pool = require('../db/index');

const app = express();
const port = 3000;

pool.query('SELECT * FROM questions', (err, res) => {
  console.log('hello');
  console.log(err, res);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
