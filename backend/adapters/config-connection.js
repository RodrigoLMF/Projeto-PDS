var mysql = require('mysql2');
const util = require("util"); 

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Lwymmd!3',
    database: 'tp_pds',
});

//con.query = util.promisify(con.query).bind(con);
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;

