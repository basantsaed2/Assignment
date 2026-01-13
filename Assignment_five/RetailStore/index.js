const express = require("express");
const app = express();
const port = 3000;

const connection = require("./src/database/db");

const productRouter = require("./src/products/products_controller");

app.use("/products", productRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});