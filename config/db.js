const mysql = require('mysql2');
require('dotenv').config();

// connect to MySQL using credentials from .env
const pool = mysql.createPool({
    host:     process.env.HEALTH_HOST,
    user:     process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();
