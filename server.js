var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'topics_board',

// });

// connection.connect(function(err){
//   if(!err)
//     console.log('connection worked!');
//   else
//     console.log('connection failed', err);
// });

// connection.query('select * from products', function(err, results){
//     console.log(results);
//   });

require('./config/routes')(app);
// app.get("/",function(req,res){
// connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
// connection.end();
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
//   });
// });

app.listen(3000);