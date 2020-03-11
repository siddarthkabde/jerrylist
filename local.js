var path = require('path'),
	express = require('express');
var qs = require('querystring');
var app = express();
var MongoClient = require('mongodb').MongoClient;
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/wt', express.static(path.join(__dirname, 'walkthrough')));
app.use('/mindmap', express.static(path.join(__dirname, 'mindmap')));
app.use('/module', express.static(path.join(__dirname, 'module')));
app.use('/service', express.static(path.join(__dirname, 'service')));

var mongoose = require("mongoose");

app.get('/', function (req, res) {
	// console.log("method in get/: " + req.method);
	var qs = require('querystring');
	res.send("Hello World");
});

var assert = require('assert');

var uristring1 =
	process.env.MONGODB_URI ||
	'mongodb://localhost/HelloMongoose';
// Connection URL
var uristring = "mongodb://loyola_bdn:D9966cc@n1@ds149616.mlab.com:49616/heroku_rwk1pgjs";
// Database Name
var dbName = 'heroku_rwk1pgjs';
// Create a new MongoClient
var client = new MongoClient(url);

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

mongoose.connect(uristring1, function (err, res) {
	if (err) {
		// console.log ('ERROR connecting to: ' + uristring1 + '. ' + err);
	} else {
		// console.log ('Succeeded connected to: ' + uristring1);
	}
});

// MongoClient.connect(url, function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = client.db();
//   console.log("Database connection ready");

//   // Initialize the app.
//   var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port); 
//   });
// });

// 	app.use("/service/contactlistDb", contactlistDb);

// app.post("/", function (req, res) {
// 	var body = '';
// 	var regex = /!\[(.*?)\]\((.*?)\)/g;
// 	var m;
// 	var printResult = (array) => {
// 		var aResult = [];
// 		var url = array[2];
// 		var splited = url.split(".");
// 		var oResult = {
// 			"localFile": array[1] + "." + splited[splited.length - 1],
// 			"fileUrl": url
// 		};
// 		aResult.push(oResult);
// 		return aResult;
// 	};
// 	req.on('data', function (data) {
// 		body += data;
// 		if (body.length > 1e6)
// 			request.connection.destroy();
// 	});

// 	req.on('end', function () {
// 		var post = qs.parse(body);
// 		var aResult = [];
// 		// res.send("your request is: " + post.markdown_source);
// 		while ((m = regex.exec(post.markdown_source)) !== null) {
// 			if (m.index === regex.lastIndex) {
// 				regex.lastIndex++;
// 			}
// 			aResult = aResult.concat(printResult(m));
// 		}
// 		console.log(aResult);
// 		res.json(aResult);
// 	});
// });
// app.listen(process.env.PORT || 3000, function () {
// 	console.log("Example app listens on port 3000.");
// });