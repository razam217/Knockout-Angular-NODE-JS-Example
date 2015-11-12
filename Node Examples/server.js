// server.js

// BASE SETUP
// ====================================================

// call the packages we need
var express = require('express');	// call express
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');		// call mongoose for MondoDB

// configure app to use body-parser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
console.log(__dirname);
app.use(express.static(__dirname));  //static stuff
//app.use(express.static(__dirname + '/app')); //js files
app.use(bodyParser.json());

// connecting mongoDB with localhost
mongoose.connect('mongodb://localhost/myNewDB');
var userSchema = new mongoose.Schema({
	name: {
		firstName: String,
		lastName: String
	},
	age: Number,
	gender: String,
	marital_status : String,
	father_name : String
});

var User = mongoose.model("User", userSchema);


var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// ====================================================
var router = express.Router();		// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/user', function(req, res) {
    User.find(function(err, success){
		if(err){
			res.json(err);
		}else {
			res.json(success);
		}
	});
});

router.post('/user', function(req, res) {
	User.create(req.body, function(err, success){
		if(err){
			console.log("Error: " + err);
		} else {
			res.json(success._id);
		}	
	});
});

router.get('/user/:id', function(req, res) {
	User.findById(req.params.id, function(err, success){
		if(err){
			res.json(err);
		}else {
			res.json(success);
		}
	});
});

router.delete('/user/:id', function(req, res) {
	User.remove({ _id: req.params.id}, function(err, success){
		if(err){
			res.json(err);
		}else {
			res.json(success);
		}
	});
});

router.get('/gender', function(req, res) {
	var genders = ["Male", "Female", "Unknown", "Undifferentiatied"];
	res.json(genders);
})

router.get('/user/search', function(req, res) {
	console.log("Called");
	var searchTerm = req.query.search;
	console.log(searchTerm);
	// User.find({ name: req.params.name}, function(err, success){
		// if(err){
			// res.json(err);
		// }else {
			// console.log(success);
			// res.json(success);
		// }
	// });
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);