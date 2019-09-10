const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080'
}));

const productsjson = require('./products.json');
const offerjson = {
    "offers": [
        {"min_total": 5000, "offer_title": "Free delivery", "offer_detail": "Get free delivery on orders of above 5000"},
        {"min_total": 6000, "offer_title": "Flat 1500 off on Flights", "offer_detail": "Get flat 1500 off on your next domestice flight"},
        {"min_total": 7500, "offer_title": "Free movie passes", "offer_detail": "Get four movie passes on shoppin for more than 7500"},
        {"min_total": 10000, "offer_title": "You are Legend", "offer_detail": "You are now officially a legend and we got nothing for ya!"},
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
    console.log(req.query);
    if(req.query.amount !== undefined) {
        offers = offerjson.offers
                    .sort((offer1, offer2) => offer1.min_total > offer2.min_total);
        curroffer = offers;
        nextoffer = offers;

        curroffer = curroffer.filter(offer => offer.min_total <= req.query.amount);
        nextoffer = nextoffer.filter(offer => offer.min_total > req.query.amount);
        

        curroffer = curroffer.length === 0 ? {min_total: 0, offer_title: "", offer_detail: ""} : curroffer.reverse()[0];
        nextoffer = nextoffer.length === 0 ? {min_total: 0, offer_title: "", offer_detail: "", basket_difference: 0} : nextoffer[0];
        nextoffer.basket_difference = nextoffer.min_total - req.query.amount;
        
        res.setHeader('Content-Type', 'application/json');
        console.log('Seding folowing data: ', nextoffer, curroffer);
        res.end(JSON.stringify({
            "next_offer": nextoffer,
            "curr_offer": curroffer
        }));
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(offerjson.offers[0]));
    return;
})
app.listen(3000);
console.log('Serving on https://localhost:3000');
