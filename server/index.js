const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080'
}));

const json = require('./products.json');

app.get('/', (req, res) => {
    console.log('request to /');
    res.send('hey');
});

app.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json));
});

app.listen(3000);
console.log('Serving on https://localhost:3000');
