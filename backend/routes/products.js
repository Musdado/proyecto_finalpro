const express = require("express");
const { getproducts, createproduct, getspecproduct, updateproduct, deleteproduct } = require("../controllers/products");
const router = express.Router();

router.route('/')
    .get(getproducts)
    .post(createproduct);

router.route('/:id')
    .get(getspecproduct)
    .patch(updateproduct)
    .delete(deleteproduct);

module.exports = router;
