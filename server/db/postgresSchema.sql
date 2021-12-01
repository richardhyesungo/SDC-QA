CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL,
  product_id INTEGER,
  body VARCHAR(1000),
  date_written DATE,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported INTEGER,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS answers (
  id BIGSERIAL,
  question_id INTEGER,
  body VARCHAR(1000),
  date_written DATE,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  reported INTEGER,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS answers_photos (
  id BIGSERIAL,
  answer_id INTEGER,
  url VARCHAR(200)
);

ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);
ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE answers_photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
ALTER TABLE answers_photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id);

-- /* copy csv data into tables */
\COPY questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/data/db/questions.csv' DELIMITER ',' CSV HEADER;
\COPY answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/data/db/answers.csv' DELIMITER ',' CSV HEADER;
\COPY answers_photos (id, answer_id, url) FROM '/data/db/answers_photos.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE questions rename column body TO question_body;
ALTER TABLE questions rename column date_written TO question_date;

-- CREATE ADDITIONAL INDEXES COMMANDS
CREATE INDEX product_id_index ON questions(product_id);
CREATE INDEX question_id_index ON answers(question_id);
CREATE INDEX answer_id_index ON answers_photos(answer_id);
