const express = require("express");
const router = express.Router();
const { createSale, getAllSales, updateSale, deleteSale } = require("./sales_services");

router.post("/", createSale);
router.get("/", getAllSales);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

module.exports = router;