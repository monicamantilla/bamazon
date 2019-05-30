var mysql = require("mysql");
var Table = require('cli-table3');

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
console.log("");
});
};
displayProducts();




// function questions() {
//     inquirer
//       .prompt([
//         {
//         name: "productID",
//         type: "input",
//         message: "What is the product ID",
//       },
//       {
//         name: "stockQuant",
//         type: "input",
//         message: "How many units would you like to buy?",
//       },{
//         name: "question",
//         type: "list",
//         choices: ["YES", "NO"],
//         message: "Would you like to buy this item?",
//       },
     
//       ])
//     .then(function(answers){
//       var inputID = answers.productID;
//       var inputQuant= answers.stockQuant;
//       var inputBuy = answers.question;
//       purchaseOrder(inputID, inputQuant, question);
//     });
//    };

       