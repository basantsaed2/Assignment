const ProductSchema = require("./products_schema");
const db = require("../database/db");

const getAllProducts = (req, res) => {
    db.query(`SELECT * FROM ${ProductSchema.tableName}`, (err, results) => {
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

    const query = `INSERT INTO ${ProductSchema.tableName} (${ProductSchema.attributes.name}, ${ProductSchema.attributes.price}, ${ProductSchema.attributes.stock}, ${ProductSchema.attributes.supplier}) VALUES ('${name}', '${price}', '${stock}', '${supplier}')`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error creating product:", err);
            res.status(500).json({ error: "Failed to create product" });
        } else {
            res.status(201).json({ message: "Product created successfully" });
        }
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, stock, supplier } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    const query = `UPDATE ${ProductSchema.tableName} SET ${ProductSchema.attributes.name} = ? , ${ProductSchema.attributes.price} = ? , ${ProductSchema.attributes.stock} = ? , ${ProductSchema.attributes.supplier} = ? WHERE ${ProductSchema.attributes.id} = ?`;
    db.query(query, [name, price, stock, supplier, id], (err, results) => {
        if (err) {
            console.error("Error updating product:", err);
            res.status(500).json({ error: "Failed to update product" });
        } else {
            res.status(200).json({ message: "Product updated successfully", product: results[0] });
        }
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    const query = `DELETE FROM ${ProductSchema.tableName} WHERE ${ProductSchema.attributes.id} = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error deleting product:", err);
            res.status(500).json({ error: "Failed to delete product" });
        } else {
            res.status(200).json({ message: "Product deleted successfully", product: results[0] });
        }
    });
};

//Get product which has highest stock
const getProductWithHighestStock = (req, res) => {
    const query = `SELECT * FROM ${ProductSchema.tableName} ORDER BY ${ProductSchema.attributes.stock} DESC LIMIT 1`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching product:", err);
            res.status(500).json({ error: "Failed to fetch product" });
        } else {
            res.status(200).json(results[0]);
        }
    });
};


module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProductWithHighestStock };
