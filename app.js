

var path = require('path'), express = require('express');
var qs = require('querystring');
var app = express();


var bodyParser= require('body-parser');


// app.get('/', function(req, res){
// 	console.log("method in get/: " + req.method);
//     var qs = require('querystring');
//   res.send("Hello World");
// });

app.use('/ui5', express.static(path.join(__dirname, 'webapp')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var http = require ('http');	     // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

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
mongoose.connect(uristring, function (err, db) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.listen(process.env.PORT || 5000, function(){
     console.log("Example app listens on port 3000.");
});


app.get('/contactlist', (req, res) => {
    db.collection('contactlist').find().toArray( (err, results) => {
      res.send(results)
    });
});

