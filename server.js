var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var contactlistDb = require("./service/contactlistDb.js");
var bodyParser = require("body-parser");

var app = express();
var db;

MongoClient.connect(process.env.MONGOLAB_URI, {
native_parser: true
}, function (err, database) {
if (err) {return err;}

db = database;
app.use((req, res, next) => {
	req.db = db;
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + "/webapp"));
app.use("/service/contactlistDb", contactlistDb);

app.listen(process.env.PORT);
})
;

module.exports = app;