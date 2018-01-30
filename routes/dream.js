require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// REQUIRE MODELS
var User = require('../models/user');
var Dream = require('../models/dream');
// REQUIRE AWS API
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var comprehend = new AWS.Comprehend();
// REQUIRE HELPER FUNCTIONS
var dataCleanse = require('./helpers/dataCleanse.js')


//
var keywords;
var sentiment;
// TEXT ANALYSIS FNCS
function keyPhrase(params){ // Key Phrase Check
	comprehend.detectKeyPhrases(params, function(err, data) {	
		if (err) console.log(err, err.stack); // an error occurred
		// else     console.log(data);           // successful response
		keywords = dataCleanse.dataFormat(data)
		console.log('keyPhrase trigger')
	});
}

function detectSentiment(params){ //Sentiment check
	comprehend.detectSentiment(params, function(err, data) { 
		if (err) console.log(err, err.stack); // an error occurred
		else sentiment = data;
		console.log('detectSentiment trigger')
	});
}

function resolveAfter8Seconds() {
	setTimeout(() => {
		console.log("timeout up")
	}, 8000);
}


// before post
// var dataObject = {userId, setiment, keywords}

// Post route
router.post('/', async function(req,res,next){
	// POST INFO
	var user_id = req.body.user.id;
	var date = req.body.date;
	var content = req.body.content;
	var params = {
		LanguageCode: 'en',
		Text: content
	}

	await keyPhrase(params);
	await resolveAfter8Seconds()
  await detectSentiment(params);
	
	if (!req.body.user.id){
		console.log('done');
	}
		
	console.log('keywords', keywords);
	console.log('sentiment', sentiment);
	console.log('other random things', user_id, date, content);
	
	// DATABASE POST

});

//Delete route
router.delete('/12345', function(req,res){
	console.log(req.body);
	res.send(req.body);
})

//Put route - edit previous forms 

module.exports = router;






