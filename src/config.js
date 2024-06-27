const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1501997',
  database: 'auth'
};

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
