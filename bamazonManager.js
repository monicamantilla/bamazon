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
  promptManager();
});



var promptManager = function(){
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Please select an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
    }).then(function(answer){
        switch (answer.option){
            case "View Products for Sale":
            display();
            break;
            case "View Low Inventory":
            viewLow();
            break;
            case "Add to Inventory":
            addInventory();
            break;
            case "Add New Product":
            addNewProduct();
            break;
            case "Quit":
            quit();
        }
    });
};
    
function display(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
            , colWidths: [10, 20, 20, 10, 20], 
            colAligns: ["center", "left", "left", "center", "center"], 
            style: {
            head: ["pink"], 
            compact: true
        }
        });
        for(var i = 0; i < res.length; i++){
            table.push ([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
        console.log(table.toString());
        promptManager();
    });
};


function viewLow(){

  connection.query("SELECT * FROM products WHERE stock_quantity <= 50", function(err, res) {

        if (err) throw err;

        var table = new Table ({
            head: ['Product ID', 'Product Name', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 10, 20, 10, 10],
            colAligns: ["center", "left", "left", "right", "center"],
            style: {
                head: ["blue"],
                compact: true
            }
        });
        for(let i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        promptManager(); 
    });
};

function addInventory(){
    inquirer.prompt({
        type: 'input',
        name: 'itemID',
        message: 'Please enter an item ID',
       validate:  function(){
           if(!isNaN(idk)){
               return true;
           }
           console.log("Please enter a valid ID")
           return fale;
       }
    })
};