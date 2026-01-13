const SalesSchema = {
    tableName: "Sales",
    attributes: {
        id: "SaleID",
        productId: "ProductID",
        quantity: "Quantity",
        saleDate: "SaleDate"
    },
    createTable: `
        CREATE TABLE IF NOT EXISTS Sales (
            SaleID INT AUTO_INCREMENT PRIMARY KEY,
            ProductID INT,
            Quantity INT,
            SaleDate DATETIME,
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        )`
};

module.exports = SalesSchema;