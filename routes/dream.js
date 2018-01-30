require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
//AWS API REQUIREMENT
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var comprehend = new AWS.Comprehend();
// REQUIRE DREAM MODEL




// Post route
router.post('/', function(req,res,next){
	// USER INPUT
	var params = {
		LanguageCode: 'en', /* required */
		Text: req.body.content
	}

	// console.log('/', req.body);
	// res.send(req.body);
	// AWS COMPREHEND API
	// Key Phrase Check
	comprehend.detectKeyPhrases(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});
	//Sentiment check
	comprehend.detectSentiment(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});
});

//Delete route
router.delete('/12345', function(req,res){
	console.log(req.body);
	res.send(req.body);
})

//Put route - edit previous forms 

module.exports = router;






