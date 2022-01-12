const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const dbConfig = require('../../config.js');

let pool;

try {
  console.log('connecting');
  pool = new Pool(dbConfig);
  console.log('done');
} catch (err) {
  console.log(err);
}

pool.on('connect', () => {
  console.log('connected to db');
});

module.exports = pool;
