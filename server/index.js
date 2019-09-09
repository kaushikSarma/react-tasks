const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080'
}));

const productsjson = require('./products.json');
const offerjson = {
    "offers": [
        {"total_price": 5000, "offer_title": "Free delivery", "offer_detail": "Get free delivery on orders of above 5000"},
        {"total_price": 6000, "offer_title": "Flat 1500 off on Flights", "offer_detail": "Get flat 1500 off on your next domestice flight"},
        {"total_price": 7500, "offer_title": "Free movie passes", "offer_detail": "Get four movie passes on shoppin for more than 7500"},
        {"total_price": 10000, "offer_title": "You are Legend", "offer_detail": "You are now officially a legend and we got nothing for ya!"},
    ]
};

app.get('/', (req, res) => {
    console.log('request to /');
    res.send('hey');
});

app.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(productsjson));
});

app.get('/next-offer', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(offerjson))
})
app.listen(3000);
console.log('Serving on https://localhost:3000');
