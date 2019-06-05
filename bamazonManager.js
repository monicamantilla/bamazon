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
    inquirer.prompt([
        {
        type: 'input',
        name: 'itemId',
        message: 'Please enter an item ID',
        validate:  function(inputId){
           if(!isNaN(inputId)){
               return true;
           }
           console.log("Please enter a valid ID")
           return fale;
       }
    },{
        type: 'input',
        name: 'quantity',
        message: 'How many items would you like to add to inventory?',
        validate:  function(quant){
            if(!isNaN(quant)){
                return true;
            }
            console.log("Please enter a valid quantity")
            return fale;
    }
}
    ]).then(function(answers){
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            //outside of range error
            if((parseInt(answers.itemId) > res.length) || (parseInt(answers.itemId) <= 0)) {
                console.log("Please enter a valid ID");
            }
            var selectItem = " ";
            for(let i = 0; i < res.length; i++){
                if(res[i].id === parseInt (answers.itemId)){
                    selectItem = res[i];
                }
            }
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: selectItem.stock_quantity += parseInt(answers.quantity)
            },{
                id: selectItem.id
            }
        ], function(error) {
            if (error) throw error;
            console.log("You successfully added " + answers.quantity + " " + selectItem.product_name + " to the inventory");
            display()
        }
        );
        });
    });
};

function  addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "newProduct",
            message: "What is the name of the product you would like to add?"
        }, {
            type: "list",
            name: "department",
            message: "Which department does this product belong to",
            choices: ["electronics", "clothing", "accesories","makeup", "beauty", "food"]
        }, {
            type: "input",
            name: "cost",
            message: "How much does this product cost?",
            validate: function(cost) {
                if(!isNaN(cost)) {
                    return true;
                }
                console.log("Please enter a valid number.");
                return false;
            }
        }, {
            type: "input",
            name: "inventoryQuant",
            message: "How many products are currently in inventory?",
            validate: function(inventoryQuant) {
                if (!isNaN(inventoryQuant)) {
                    return true;
                }
                console.log("Please enter a valid quantity");
                return false;
            }
        }
    ]).then(function(answer2) {
        //Insert new products into table
        var queryString = "INSERT INTO products SET ?";
        connection.query(queryString, {
            product_name: answer2.newProduct,
            department_name: answer2.department,
            price: answer2.cost,
            stock_quantity: answer2.inventoryQuant,
        })
        // Message to confirm product has been added 
        console.log(answer2.newProduct + "has been added to Bamazon.");
        display();
    });
};
// Function to quit the program
function quit() {
    connection.end();
};

