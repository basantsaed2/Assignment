-- Create RetailStore Database
Create Database retail_store;

-- 1.Create the required tables for the retail store database based on the tables structure and relationships.
Create Table Suppliers(
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(255) NOT NULL,
    ContactNumber VARCHAR(20)
);

Create Table Products(
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

Create Table Sales(
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT,
    Quantity INT,
    SaleDate DATETIME,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- 2.Add a column “Category” to the Products table.
Alter Table products Add Category VARCHAR(50);

-- 3.Remove the “Category” column from Products.
Alter Table products DROP Category;

-- 4.Change “ContactNumber” column in Suppliers to VARCHAR (15).
Alter Table suppliers MODIFY ContactNumber VARCHAR(15);

-- 5.Add a NOT NULL constraint to ProductName.
Alter Table products MODIFY ProductName VARCHAR(255) NOT NULL;

-- 6.Perform Basic Inserts:
---- a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
Insert INTO suppliers (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567');

---- b. Insert the following three products, all provided by 'FreshFoods':
---- i. 'Milk' with a price of 15.00 and stock quantity of 50.
---- ii. 'Bread' with a price of 10.00 and stock quantity of 30.
---- iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
Insert INTO products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Milk', 15.00, 50, 1) , ('Bread', 10.00, 30, 1) , ('Eggs', 20.00, 40, 1);

---- c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
Insert INTO sales (ProductID, Quantity, SaleDate) VALUES (1, 2, '2025-05-20');

-- 7.Update the price of 'Bread' to 25.00.
Update products SET Price = 25.00 WHERE ProductName = 'Bread';

-- 8.Delete the product 'Eggs'.
Delete FROM products WHERE ProductName = 'Eggs';

-- 9.Retrieve the total quantity sold for each product.
Select p.ProductName, SUM(s.Quantity) as TotalQuantitySold
From products p
LEFT JOIN sales s ON p.ProductID = s.ProductID
Group BY p.ProductID;

-- 10. Product with highest stock
SELECT * FROM products ORDER BY StockQuantity DESC LIMIT 1;

-- 11. Suppliers starting with 'F'
SELECT * FROM suppliers WHERE SupplierName LIKE 'F%';

-- 12. Products never sold
SELECT * FROM products WHERE ProductID NOT IN (SELECT ProductID FROM sales);

-- 13.Get all sales along with product name and sale date.
SELECT s.SaleID, p.ProductName, s.SaleDate
FROM sales s
JOIN products p ON s.ProductID = p.ProductID;

-- 14.Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables.
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';

-- 15-Revoke UPDATE permission from “store_manager”.
REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';

-- 16-Grant DELETE permission to “store_manager” only on the Sales table.
GRANT DELETE ON retail_store.sales TO 'store_manager'@'localhost';