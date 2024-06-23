var express = require('express');
var router = express.Router();
var home = require('../public/api/home');
var detail = require('../public/api/detail');
var checkout = require('../public/api/checkout');
var listing = require('../public/api/listing');
const app = express();
const cors = require('cors'); 
app.use(cors());

/* GET home page. */
router.get('/', cors(),function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/home',cors() ,async (req, res) => {
    const data = await home(req, res);  // Await the result of the async function
    res.send(data);  // Send the result of the async function
});

router.get('/detail',cors() ,async (req, res) => {
    const data = await detail(req, res);  // Await the result of the async function
    res.send(data);  // Send the result of the async function
});

router.get('/checkout', cors(),async (req, res) => {
    const data = await checkout(req, res);  // Await the result of the async function
    res.send(data);  // Send the result of the async function
});

router.get('/listing' , cors() ,async (req, res) => {
    const data = await listing(req, res);  // Await the result of the async function
    res.send(data);  // Send the result of the async function
});


module.exports = router;
