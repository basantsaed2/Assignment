const ProductSchema = require("./products_schema");
const connection = require("../database/db");

const getAllProducts = (req, res) => {
    connection.query(`SELECT * FROM ${ProductSchema.tableName}`, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ error: "Failed to fetch products" });
        } else {
            res.status(200).json(results);
        }
    });
};

const createProduct = (req, res) => {
    const { name, price, stock, supplier } = req.body;
    const query = `INSERT INTO ${ProductSchema.tableName} (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?)`;
    connection.query(query, [name, price, stock, supplier], (err, results) => {
        if (err) {
            console.error("Error creating product:", err);
            res.status(500).json({ error: "Failed to create product" });
        } else {
            res.status(201).json({ message: "Product created successfully", id: results.insertId });
        }
    });
};

module.exports = { getAllProducts, createProduct };
