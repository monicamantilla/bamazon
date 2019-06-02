var mysql = require("mysql");
var Table = require('cli-table3');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Larita1*",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;

});