var path = require('path'),
	express = require('express');
var qs = require('querystring');
var app = express();

var bodyParser = require('body-parser');

// app.get('/', function(req, res){
// 	console.log("method in get/: " + req.method);
//     var qs = require('querystring');
//   res.send("Hello World");
// });

app.use('/ui5', express.static(path.join(__dirname, 'webapp')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var http = require('http'); // For serving a basic web page.
var mongoose = require("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring =
	process.env.MONGODB_URI ||
	'mongodb://localhost/HelloMongoose';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.

var db
mongoose.connect(uristring, function (err, client) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
		db = client
		var myStudents = [{
				SNo: 1
				Adm: "X18"
				Name: "G. AMULYA"
				Class: "N - A"
				Sex: "G"
				DOB: 42507
				Father Name: "G. GNYANESHWAR"
				Old or New: "New"
				Cell: 9011146733
				Mode: "V"
				Address: "KALDURKI"
				Agrmnt No: "N"
				"Oerall Fees ": 11500
				Overall Adj: 11500
				Overall Paid: 0
				Overall Due: 11500
				Old Bal: 0
				Old Adj Bal: 0
				Old Paid: 0
				Old Due: 0
				2019 - 20 Fees: 11500
				2019 - 20 Adj Fees: 11500
				2019 - 20 Paid: 0
				2019 - 20 Due: 11500
				School Fees: 5500
				Bus Fees: 6000
				Hostel Fees: "0"
				Overall Fee % : 0
				New Fee % : 0
			}, {
				SNo: 2
				Adm: "X100"
				Name: "CH. BHASHITHA PRIYA"
				Class: "N - A"
				Sex: "G"
				DOB: 42377
				Father Name: "CH. KISHORE"
				Old or New: "New"
				Cell: 8897486689
				Mode: "V"
				Address: "KUMMANPALLY"
				Agrmnt No: "AG69"
				"Oerall Fees ": 11500
				Overall Adj: 7500
				Overall Paid: 2000
				Overall Due: 5500
				Old Bal: 0
				Old Adj Bal: 0
				Old Paid: 0
				Old Due: 0
				2019 - 20 Fees: 11500
				2019 - 20 Adj Fees: 7500
				2019 - 20 Paid: 2000
				2019 - 20 Due: 5500
				School Fees: 5500
				Bus Fees: 6000
				Hostel Fees: "0"
				Overall Fee % : 26.666666666666668
				New Fee % : 26.666666666666668
			}

		]

		db.collection("StudentMaster").insertMany(myStudents, function (err, result) {
			if (err) throw err;
			console.log("Number of documents inserted: " + res.insertedCount);
			db.close();
		});

	}
});

app.listen(process.env.PORT || 5000, function () {
	console.log("Example app listens on port 3000.");
});

app.get('/', (req, res) => {
	db.collection('contactlist').find().toArray((err, results) => {
		res.send(results)
	});
});

// app.post('/SaveStudentMaster', (req, res) => {
//   db.collection('StudentMaster').save(req.body, (err, result) => {
//     if (err) return console.log('--->Error->',err);
//     console.log('--->saved to database');
//     res.redirect('/');
//   });
// })

app.post('/SaveStudentMaster', (req, res) => {
	//db.collection('StudentMaster').save(req.body, (err, result) => {});
	var body = req.body;
	db.collection('StudentMaster').insertOne(body);
})