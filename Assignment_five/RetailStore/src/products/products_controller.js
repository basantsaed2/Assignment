const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require("./products_services");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;