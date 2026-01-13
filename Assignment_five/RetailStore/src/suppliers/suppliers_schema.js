const SupplierSchema = {
    tableName: "Suppliers",
    attributes: {
        id: "SupplierID",
        name: "SupplierName",
        contactNumber: "ContactNumber",
    },
    createTable: `
        CREATE TABLE IF NOT EXISTS Suppliers (
            SupplierID INT AUTO_INCREMENT PRIMARY KEY,
            SupplierName VARCHAR(255) NOT NULL,
            ContactNumber VARCHAR(20)
        )`
};

module.exports = SupplierSchema;
