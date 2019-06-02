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

function displayProducts(){

    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("Display Inventory: " + "\n" + "--------------") 

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
shopping(); 
});
};



var shopping = function () {
  inquirer
  .prompt({
        
        name: "productID",
        type: "input",
        message: "What is the product ID?",
  })
      .then(function(answer1){
        var selection = answer1.productID;
        connection.query("SELECT * FROM products WHERE id= ? ", selection, function(err, res){
          if (err) throw err;
          if(res.length === 0){
            console.log("That product ID does not exist")
        
          shopping();
          } else {
            inquirer.prompt({
              name: "quantity",
              type: "input",
              message: "How many would you like to buy?",
            }).then(function(answer2){
              var quantity = answer2.quantity;
              if (quantity > res[0].stock_quantity){
                console.log("We are sorry we only have " + res[0].stock_quantity)
            shopping();    
              }else{
                console.log(res[0].product_name + " purchased");
                console.log(quantity + " items at " + res[0].price + " per item")
                
                var adjusted = res[0].stock_quantity - quantity;
                connection.query("UPDATE products SET stock_quantity = " + adjusted + " WHERE id = " + res[0].id, function(err, resUpdate) {
                    if (err) throw err;
                   
                    console.log("Your Order has been processed.");
                    console.log("Thank you for shopping with us!");
                   
                    connection.end();
                })
              }
            })
          }
        });
      
      });

    
    };
    displayProducts(); 

