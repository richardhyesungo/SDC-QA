FROM postgres:alpine

COPY *.sql /docker-entrypoint-initdb.d/

ADD csv_files/questions.csv /data/db/questions.csv
ADD csv_files/answers.csv /data/db/answers.csv
ADD csv_files/answers_photos.csv /data/db/answers_photos.csv

ADD server/db/postgresSchema.sql /docker-entrypoint-initdb.d/1-postgresSchema.sql

RUN chmod a+r /docker-entrypoint-initdb.d/*

EXPOSE 5432