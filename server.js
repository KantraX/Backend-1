const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.send('¡Server ON!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});