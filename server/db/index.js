const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const dbConfig = require('../../config.js');

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('connected to db');
});

module.exports = pool;

// const query =
//   'INSERT INTO photos (id, style_id, url, thumbnail_url) VALUES ($1, $2, $3, $4)';

// const questionsCsv = path.join(__dirname, '../..', 'csv_files', 'test.csv');
// const questionInsertQuery = `INSERT INTO test(id, product_id, body, date_written, asker_name, asker_email, reported,helpful) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;

// const stream = fs.createReadStream(questionsCsv);

// let csvData = [];

// stream
//   .pipe(fastcsv.parse())
//   .on('error', (error) => console.log(error))
//   .on('data', (row) => {
//     csvData.push(row);
//     console.log(csvData);
//   })
//   .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));

// stream.on('error', (err) => {
//   console.error(err);
// });

// let csvData = [];

// const csvStream = fastcsv
//   .parse()
//   .on('data', (err, data) => {
//     if (!err) {
//       csvData.push(data);
//     }
//   })
//   .on('end', (data) => {
//     // Removes header from the array
//     csvData.shift();

//     // Connect to the database and save data
//     pool.connect( (err, client, done) => {
//       if (err) {
//         console.error('error connecting');
//         throw new Error(err);
//       } else {
//         csvData.forEach((row) => {
//           client.query(questionInsertQuery, row, (err, res) => {
//             if (err) {
//               console.error('err in a query');
//               throw new Error(err);
//             }
//           });
//         });
//       }

//       done();
//     });
//   })
//   .on('error', (err) => {
//     console.error('err calling fastcsv');
//     console.error(err);
//   });

// stream.pipe(csvStream);
