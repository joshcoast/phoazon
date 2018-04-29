var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	listProducts();
});

function listProducts() {
	console.log("\nAvailable Products");
	console.log("------------------");
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		res.forEach(function (element) {
			console.log(`ID: ${element.item_id}, Name: ${element.product_name}, Price: $${element.price}`);
		});
		buyProduct();
	});
}

function buyProduct() {
	inquirer
		.prompt([{
				name: "productId",
				type: "input",
				message: "What is the ID for the product you'd like to buy? ",
				validate: function (value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like to buy? ",
				validate: function (value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		])
		.then(function (answer) {
			var answerProductId = answer.productId;
			var answerQuantity = answer.quantity;

			connection.query(`SELECT * FROM products WHERE item_id = "${answerProductId}"`, function (err, results) {
				if (err) throw err;
				// results will contain the results of the query
				var productName = results[0].product_name;
				var productPrice = results[0].price;
				if (results[0].stock_quantity >= answerQuantity) {
					var newQuantity = results[0].stock_quantity - answerQuantity;
					updateProduct(answerQuantity, newQuantity, answerProductId, productName, productPrice);
				} else {
					console.log(`Sorry, you wanted ${answerQuantity} and we only have ${results[0].stock_quantity}. Order canceled due to insufficient quantity!`);
				}
				connection.end();
			});
		});
}

function updateProduct(answerQuantity, newQuantity, answerProductId, productName, productPrice) {
	connection.query(`UPDATE products SET stock_quantity = '${newQuantity}' WHERE item_id = '${answerProductId}'`, function (error) {
		if (error) throw error;
		console.log(`You just bought ${answerQuantity} ${productName}s for $${productPrice * answerQuantity}`);
	});
}