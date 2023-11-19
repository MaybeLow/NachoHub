const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
}).promise();

module.exports = pool;