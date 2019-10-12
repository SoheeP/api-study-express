var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "root",
  database: "stduy_express"
});
db.connect();


exports.db = db;