DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Cloths", 35.50, 20),
	("Watch", "Cloths", 35.50, 10), 
	("TV", "Electronics", 1200.00, 4), 
	("iPad", "Electronics", 700.00, 7),
	("Chair", "Home", 89.99, 14),
	("Table", "Home", 145.00, 9), 
	("Desk", "Home", 49.99, 5), 
	("Power Ranger", "Toys", 29.99, 32), 
	("Super Ball", "Toys", 2.99, 105), 
	("GI Joe", "Toys", 19.99, 37);