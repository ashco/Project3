require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// REQUIRE MODELS
var User = require('../models/user');
var Dream = require('../models/dream');


//GET ROUTE
router.get('/profile', function(req, res){
	console.log("Got to profile route",req.query.user);
	Dream.find({ user_id: req.query.user }, function(err, dream){
		if(err){
			console.log(err);
		}
		console.log(dream);
		res.send(dream);
	})
});

module.exports = router;
