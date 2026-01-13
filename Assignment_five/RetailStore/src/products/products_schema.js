const ProductSchema = {
    tableName: "Products",
    attributes: {
        id: "ProductID",
        name: "ProductName",
        price: "Price",
        stock: "StockQuantity",
        supplier: "SupplierID"
    },
    // The raw SQL to build the table structure
    createTable: `
        CREATE TABLE IF NOT EXISTS Products (
            ProductID INT AUTO_INCREMENT PRIMARY KEY,
            ProductName VARCHAR(255) NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            StockQuantity INT DEFAULT 0,
            SupplierID INT NULL,
            FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
        )`
};

module.exports = ProductSchema;