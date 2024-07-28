const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../products.json');

let products = [];

function saveProducts() {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
}

function loadProducts() {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf8');
        products = JSON.parse(data);
    } catch (error) {
        products = [];
    }
}

function getAllProducts() {
    loadProducts();
    return products;
}

function getProductById(pid) {
    loadProducts();
    return products.find(product => product.id === pid);
}

function addProduct(productData) {
    loadProducts();
    const newProduct = {
        id: generateProductId(), 
        ...productData
    };
    products.push(newProduct);
    saveProducts();
    return newProduct;
}

function updateProduct(pid, updatedProduct) {
    loadProducts();
    const index = products.findIndex(product => product.id === pid);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        saveProducts();
        return products[index];
    }
    return null;
}

function deleteProduct(pid) {
    loadProducts();
    const initialLength = products.length;
    products = products.filter(product => product.id !== pid);
    if (products.length !== initialLength) {
        saveProducts();
        return products;
    }
    return null;
}

function generateProductId() {
    return products.length > 0 ? products[products.length - 1].id + 1 : 1;
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};