const SupplierSchema = require("./suppliers_schema");
const db = require("../database/db");


const getAllSuppliers = (req, res) => {
    const query = `SELECT * FROM ${SupplierSchema.tableName}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching suppliers:", err);
            res.status(500).json({ error: "Failed to fetch suppliers" });
        } else {
            res.status(200).json(results);
        }
    });
};

const createSupplier = (req, res) => {
    const { name, contact } = req.body;
    const query = `INSERT INTO ${SupplierSchema.tableName} (${SupplierSchema.attributes.name}, ${SupplierSchema.attributes.contactNumber}) VALUES (${name}, ${contact})`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error creating supplier:", err);
            res.status(500).json({ error: "Failed to create supplier" });
        } else {
            res.status(201).json({ message: "Supplier created successfully", id: results.insertId });
        }
    });
};

const updateSupplier = (req, res) => {
    const { id } = req.params;
    const { name, contact } = req.body;

    const query = `UPDATE ${SupplierSchema.tableName} SET ${SupplierSchema.attributes.name} = '${name}', ${SupplierSchema.attributes.contactNumber} = '${contact}' WHERE ${SupplierSchema.attributes.id} = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error updating supplier:", err);
            res.status(500).json({ error: "Failed to update supplier" });
        } else {
            res.status(200).json({ message: "Supplier updated successfully", supplier: results[0] });
        }
    });
};

const deleteSupplier = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM ${SupplierSchema.tableName} WHERE ${SupplierSchema.attributes.id} = ${id}`;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error deleting supplier:", err);
            res.status(500).json({ error: "Failed to delete supplier" });
        } else {
            res.status(200).json({ message: "Supplier deleted successfully", supplier: results[0] });
        }
    });
};

module.exports = { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier };
