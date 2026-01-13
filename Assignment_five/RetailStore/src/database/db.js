const mysql = require("mysql2");
const ProductSchema = require("../products/products_schema");
const SupplierSchema = require("../suppliers/suppliers_schema");

// Connect to MySQL server (not to a specific DB yet)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

// 1. Create Database
connection.query("CREATE DATABASE IF NOT EXISTS retail_store", (err) => {
    if (err) throw err;
    console.log("Database created or already exists.");

    // 2. Use the database
    connection.changeUser({ database: 'retail_store' }, (err) => {
        if (err) throw err;
        console.log("Connected to database");

        // 3. Create Tables in correct order (Suppliers first due to Foreign Key)
        connection.query(SupplierSchema.createTable, (err) => {
            if (err) throw err;
            console.log("Suppliers table ready");

            connection.query(ProductSchema.createTable, (err) => {
                if (err) throw err;
                console.log("Products table ready");
            });
        });
    });
});

module.exports = connection;
