var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();

emp = require('./routes/employee');

var bodyParser = require("body-parser");
var mongodb = require("mongodb");

app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	// Save database object from the callback for reuse.
	db = client.db();
	console.log("Database connection ready");

	// Initialize the app.
	var server = app.listen(process.env.PORT, function () {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});









app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
// app.get('/', function(req, res){
// 	console.log("method: " + req.method);
//   res.send("Hello World");
// });

app.get('/loyoladb', emp.findAll);

// app.post("/", function(req, res){
// 	var body = '';
// 	const regex = /!\[(.*?)\]\((.*?)\)/g;
// 	var m;
// 	var printResult = ( array ) => {
// 		var aResult = [];
//     	var url = array[2];
//     	var splited = url.split(".");
//     	var oResult = {
//     		"localFile": array[1] + "." + splited[splited.length-1],
//     		"fileUrl": url
//     	};
// 		aResult.push(oResult);
// 		return aResult;
// 	};
// 	req.on('data', function (data) {
//             body += data;
//             if (body.length > 1e6)
//                 request.connection.destroy();
//         });

//     req.on('end', function () {
//             var post = qs.parse(body);
//             var aResult = [];
//             // res.send("your request is: " + post.markdown_source);
//             while ((m = regex.exec(post.markdown_source)) !== null) {
//     			if (m.index === regex.lastIndex) {
//         			regex.lastIndex++;
//     			}
//     			aResult = aResult.concat(printResult(m));
//     		}
//     		console.log(aResult);
//     		res.json(aResult);
//     	});
// 	});
// app.listen(process.env.PORT || 3000, function(){
//      console.log("Example app listens on port 3000.");
// });