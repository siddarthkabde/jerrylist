// app.js
var path = require('path'); 
var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var app = express();

// call UI5 application
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://someuser:abcd1234@ds149616.mlab.com:49616/heroku_rwk1pgjs';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
