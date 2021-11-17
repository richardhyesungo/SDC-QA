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


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

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


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL,
  answer_id INTEGER,
  url VARCHAR(200)
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id);