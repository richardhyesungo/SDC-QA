/* Postgres ETL commands */

/* copy questions.csv into questions table */
COPY questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/richardo/downloads/questions.csv' DELIMITER ',' CSV HEADER;

/* copy answers.csv into answers table */
COPY answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/richardo/downloads/answers.csv' DELIMITER ',' CSV HEADER;

/* copy answers_photos.csv into answers_photos table */
COPY answers_photos (id, answer_id, url) FROM '/Users/richardo/downloads/answers_photos.csv' DELIMITER ',' CSV HEADER;