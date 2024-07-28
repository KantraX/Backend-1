const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../carts.json');

let carts = [];

function saveCarts() {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2), 'utf8');
}

function loadCarts() {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf8');
        carts = JSON.parse(data);
    } catch (error) {
        carts = [];
    }
}

function getAllCarts() {
    loadCarts();
    return carts;
}

function getCartById(cid) {
    loadCarts();
    return carts.find(cart => cart.id === cid);
}

function addCart(cartData) {
    loadCarts();
    const newCart = {
        id: generateCartId(),
    };
    carts.push(newCart);
    saveCarts();
    return newCart;
}

function addProductToCart(cid, pid, quantity) {
    loadCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cid);
    if (cartIndex !== -1) {
        
        const productIndex = carts[cartIndex].products.findIndex(item => item.product === pid);
        if (productIndex !== -1) {
            
            carts[cartIndex].products[productIndex].quantity += quantity;
        } else {
            
            carts[cartIndex].products.push({ product: pid, quantity });
        }
        saveCarts();
        return carts[cartIndex];
    }
    return null;
}

function generateCartId() {
    return carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
}

module.exports = {
    getAllCarts,
    getCartById,
    addCart,
    addProductToCart
};