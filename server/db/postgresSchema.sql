-- CREATE TABLE IF NOT EXISTS questions (
--   id BIGSERIAL,
--   product_id INTEGER,
--   body VARCHAR(1000),
--   date_written DATE,
--   asker_name VARCHAR(100),
--   asker_email VARCHAR(100),
--   reported INTEGER,
--   helpful INTEGER
-- );


-- ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
-- CREATE INDEX product_id_index ON questions(product_id);
-- alter table questions rename column body to question_body;
-- alter table questions rename column date_written to question_date;

-- CREATE TABLE IF NOT EXISTS answers (
--   id BIGSERIAL,
--   question_id INTEGER,
--   body VARCHAR(1000),
--   date_written DATE,
--   answerer_name VARCHAR(100),
--   answerer_email VARCHAR(100),
--   reported INTEGER,
--   helpful INTEGER
-- );


-- ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);
-- CREATE INDEX question_id_index ON answers(question_id);

-- CREATE TABLE IF NOT EXISTS photos (
--   id BIGSERIAL,
--   answer_id INTEGER,
--   url VARCHAR(200)
-- );


-- ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
-- CREATE INDEX answer_id_index ON answers_photos(answer_id);

-- ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
-- ALTER TABLE photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id);

CREATE TABLE IF NOT EXISTS test2 (
  id BIGSERIAL,
  product_id INTEGER,
  body VARCHAR(1000),
  date_written DATE,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported INTEGER,
  helpful INTEGER
);