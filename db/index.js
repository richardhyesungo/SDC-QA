const { Pool, Client } = require('pg');
const dbConfig = require('../config.js');

const pool = new Pool(dbConfig);

pool.query('SELECT * FROM test', (err, res) => {
  console.log('hello');
  console.log(err, res);
  // pool.end();
});

pool.query(
  'CREATE TABLE IF NOT EXISTS test2(id serial PRIMARY KEY)',
  (err, res) => {
    console.log('hello');
    console.log(err, res);
    pool.end();
  }
);

/* CREATE TABLE questions (
  id BIGSERIAL,
  product_id INTEGER,
  body VARCHAR(1000),
  date_written DATE,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported INTEGER,
  helpful INTEGER
 );


 ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

 CREATE TABLE answers (
  id BIGSERIAL,
  question_id INTEGER,
  body VARCHAR(1000),
  date_written DATE,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  reported INTEGER,
  helpful INTEGER
 );


 ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

 CREATE TABLE photos (
  id BIGSERIAL,
  answer_id INTEGER,
  url VARCHAR(200)
 );


 ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

 ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
 ALTER TABLE photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id); */

/* const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
}); */
