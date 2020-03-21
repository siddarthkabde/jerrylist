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
var uristring =
	process.env.MONGODB_URI ||
	'mongodb://localhost:27017';

var db
mongoose.connect(uristring, function (err, {
	"user": "someuser",
	"pass": "abcd1234",
	"useMongoClient": true
}, client) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
		db = client

	}
});
// var mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/products', product);

var port = 1234;
// The http server will listen to an appropriate port, or default to
// port 1234.
var theport = process.env.PORT || 1234;

app.listen(theport, () => {
	console.log('Server is up and running on port numner ' + port);
});