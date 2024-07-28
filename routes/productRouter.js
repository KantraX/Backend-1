const express = require('express');
const router = express.Router();
const productManager = require('../managers/productManager');
const path = require('path');

const productsFilePath = path.join(__dirname, '../products.json');


router.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado, favor validar');
    }
});


router.post('/', (req, res) => {
    const newProduct = req.body;
    const product = productManager.addProduct(newProduct);
    if (product) {
        res.status(201).json(product);
    } else {
        res.status(500).send('Error al agregar producto, favor validar');
    }
});


router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updatedProduct = req.body;
    const product = productManager.updateProduct(pid, updatedProduct);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado, favor validar');
    }
});


router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const products = productManager.deleteProduct(pid);
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Producto no encontrado, favor validar');
    }
});

module.exports = router;