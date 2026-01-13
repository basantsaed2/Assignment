const SalesSchema = require("./sales_schema");
const db = require("../database/db");

const getAllSales = (req, res) => {
    const query = `SELECT * FROM ${SalesSchema.tableName}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching sales:", err);
            res.status(500).json({ error: "Failed to fetch sales" });
        } else {
            res.status(200).json(results);
        }
    });
};

const createSale = (req, res) => {
    const { productId, quantity, saleDate } = req.body;
    const query = `INSERT INTO ${SalesSchema.tableName} (${SalesSchema.attributes.productId}, ${SalesSchema.attributes.quantity}, ${SalesSchema.attributes.saleDate}) VALUES ('${productId}', '${quantity}', '${saleDate}')`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error creating sale:", err);
            res.status(500).json({ error: "Failed to create sale" });
        } else {
            res.status(201).json({ message: "Sale created successfully" });
        }
    });
};

const updateSale = (req, res) => {
    const { id } = req.params;
    const { productId, quantity, saleDate } = req.body;

    const query = `UPDATE ${SalesSchema.tableName} SET ${SalesSchema.attributes.productId} = '${productId}', ${SalesSchema.attributes.quantity} = '${quantity}', ${SalesSchema.attributes.saleDate} = '${saleDate}' WHERE ${SalesSchema.attributes.id} = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error updating sale:", err);
            res.status(500).json({ error: "Failed to update sale" });
        } else {
            res.status(200).json({ message: "Sale updated successfully", sale: results[0] });
        }
    });
};

const deleteSale = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM ${SalesSchema.tableName} WHERE ${SalesSchema.attributes.id} = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error deleting sale:", err);
            res.status(500).json({ error: "Failed to delete sale" });
        } else {
            res.status(200).json({ message: "Sale deleted successfully", sale: results[0] });
        }
    });
};

module.exports = { getAllSales, createSale, updateSale, deleteSale };



