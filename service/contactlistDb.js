var express = require("express");

var router = express.Router();

/*
 * Get contactlist
 */
router.get("/contactlist", (req, res) => {
	var db = req.db;
	var cursor = db.collection("contactlist").find({},{firstName:1, lastName:1}).sort({"lastName":1}).toArray((err, result)=>{
		if (err){
			return res.end();
		}
		res.write(JSON.stringify({"Contacts":result}));
		res.end();		
	});
});

/*
 * Get single contact
 */
router.get("/singleContact", (req, res) =>{
	var db = req.db;


	var id = Number.parseInt(req.query.contactId);
	var cursor = db.collection("contactlist").find({"_id": id}).toArray((err, result)=>{
		if (err){
			
			return res.end();
		}
		res.write(JSON.stringify(result[0]));
		res.end();

	});
});

/*
 * Update or insert single contact
 */
router.post("/saveContact", (req, res) => {
	var db = req.db;
	var body = req.body;
	body._id = Number.parseInt(req.body._id);
	// If the _id is NaN, a new contact must be created
	if ( !isNaN(body._id) ){
		db.collection("contactlist").replaceOne(
			{ _id : body._id},
			req.body,
			(err, results)=>{
				if (err) {;}
				res.end();
			} );
		res.end();
	} else {
		// first find the highest _id, and add 1 to create a new _id
		db.collection("contactlist").find().sort({"_id": -1}).toArray((err, result) => {
			body._id = result[0]._id + 1;
			db.collection("contactlist").insertOne(body);
		});
		res.end();
	}
});

/*
 * Delete single object
 */
router.post("/deleteContact", (req, res)=>{
	var db = req.db;
	var body = req.body;
	body._id = Number.parseInt(req.body._id);
	// If _id is NaN, contact doesn't exist yet, so no deletion is necessary
	if (!isNaN(body._id)){
		db.collection("contactlist").remove({_id: body._id}, 1);
	}
	res.end();
});

module.exports = router;