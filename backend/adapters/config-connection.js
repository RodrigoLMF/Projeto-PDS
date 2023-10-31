require('dotenv').config();

var mysql = require('mysql2/promise');

const user = process.env.USER;
const password = process.env.PASSWORD;

var connection = mysql.createPool({
    host: "localhost",
    user: user,
    password: password,
    database: 'tp_pds',
});

module.exports = connection;
