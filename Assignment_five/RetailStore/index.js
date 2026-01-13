const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const db = require("./src/database/db");

const productRouter = require("./src/products/products_controller");
const supplierRouter = require("./src/suppliers/suppliers_controller");
const saleRouter = require("./src/sales/sales_controller");

app.use("/products", productRouter);
app.use("/suppliers", supplierRouter);
app.use("/sales", saleRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});