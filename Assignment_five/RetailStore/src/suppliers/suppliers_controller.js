const express = require("express");
const router = express.Router();
const { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require("./suppliers_services");

router.post("/", createSupplier);
router.get("/", getAllSuppliers);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;
