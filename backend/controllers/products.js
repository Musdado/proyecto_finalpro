const express = require("express");
const Product = require("../models/productdata");

const router = express.Router();

const getproducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getspecproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createproduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(202).json(updatedProduct);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteproduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found!");
    }
    res.status(203).json(deletedProduct);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

module.exports = {
  getproducts,
  createproduct,
  getspecproduct,
  updateproduct,
  deleteproduct
};