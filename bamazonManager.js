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

var table = new Table({
    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
  , colWidths: [10, 20, 20, 10, 20], 
  colAligns: ["center", "left", "left", "center", "center"], 
  style: {
    head: ["pink"], 
    compact: true
}
});


var promptManger = function(){
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    }).then(function(selection){

        if(selection.option  === 'View Products for Sale'){
            connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;
                console.log("Display Inventory: " + "\n" + "--------------") 
            })
        }
        if(selection.option === 'View Low Inventory'){

        }

    })
}

promptManger();


// var viewProducts = function(){

// }

// var viewLowInventory = function(){

// }

// var addToInventory = function(){

// }

// var addNewProduct = function(){

// }

