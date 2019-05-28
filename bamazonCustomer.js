var mysql = require("mysql");

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
  start();
});

function start(){
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("Display Inventory: " + "\n" + "--------------");
    for(var i = 0; i < res.length; i ++){
    console.log("Item ID: " + res[i].id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Department Name: " + res[i].department_name + "\n" + "Price: " + res[i].price + "\n" + "Stock Quantity: " + res[i].stock_quantity + "\n---------------------" )
    }
})
}
// function questions() {
//     inquirer
//       .prompt([
//         {
//         name: "productID",
//         type: "list",
//         message: "What is the product ID",
//       },
//       {
//         name: "productID",
//         type: "list",
//         message: "What is the product ID",
//       },
//       {
//         name: "productID",
//         type: "list",
//         message: "What is the product ID",
//         },
//       ])
//       .then(function(answer) {
//         // based on their answer, either call the bid or the post functions
//         if (answer.postOrBid === "POST") {
//           postAuction();
//         }
//         else if(answer.postOrBid === "BID") {
//           bidAuction();
//         } else{
//           connection.end();
//         }
//       });
//   }

