const SupplierSchema = {
    tableName: "Suppliers",
    createTable: `
        CREATE TABLE IF NOT EXISTS Suppliers (
            SupplierID INT AUTO_INCREMENT PRIMARY KEY,
            SupplierName VARCHAR(255) NOT NULL,
            ContactNumber VARCHAR(20),
            Email VARCHAR(255)
        )`
};

module.exports = SupplierSchema;
