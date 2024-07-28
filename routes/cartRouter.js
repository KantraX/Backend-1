const express = require('express');
const router = express.Router();
const cartManager = require('../managers/cartManager');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../carts.json');


router.get('/', (req, res) => {
    const carts = cartManager.getAllCarts();
    res.json(carts);
});


router.get('/:cid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cid);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carro no encontrado, favor validar');
    }
});


router.post('/', (req, res) => {
    const newCart = req.body;
    const cart = cartManager.addCart(newCart);
    if (cart) {
        res.status(201).json(cart);
    } else {
        res.status(500).send('Error al crear el carro, favor validar');
    }
});


router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const { quantity } = req.body;
    const cart = cartManager.addProductToCart(cid, pid, quantity);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carro o producto no encontrado, favor validar');
    }
});

module.exports = router;