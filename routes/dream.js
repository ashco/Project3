
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
// var keywords;
// var sentiment;

// // TEXT ANALYSIS FNCS
// async function keyPhrase(params){ // Key Phrase Check
// 	return new Promise((resolve, reject) => {
// 		comprehend.detectKeyPhrases(params, function(err, data) {	
// 			if (err) console.log(err, err.stack); // an error occurred
// 			// else     console.log(data);           // successful response
// 			console.log('keyPhrase trigger') //TEST
// 			return dataCleanse.dataFormat(data)
// 		});
// 	});
// }

// TEXT ANALYSIS FNCS
async function keyPhrase(params){ // Key Phrase Check
	return new Promise((resolve, reject) => {
		comprehend.detectKeyPhrases(params, function(err, data) {	
			if (err) {
				reject(err); 
				return;
			}  
			resolve(dataCleanse.dataFormat(data)); // Successful Response	
		});
	});
}

function detectSentiment(params){ //Sentiment Check
	return new Promise((resolve, reject) => {
		comprehend.detectSentiment(params, function(err, data) { 
			if (err) {
				reject(err, err.stack);
				return; 
			}
			resolve(data); // Successful Response
		});
	});
}

// //TEST FNC
// function resolveAfter8Seconds() {
// 	setTimeout(() => {
// 		console.log("timeout up")
// 		console.log('keywords', keywords);
// 		console.log('sentiment', sentiment);
// 	}, 8000);
// }


// before post
// var dataObject = {userId, setiment, keywords}

// Post route
router.post('/', async function(req, res, next){
	// POST INFO
	let user_id = req.body.user.id;
	let date = req.body.date;
	let content = req.body.content;
	let params = {
		LanguageCode: 'en',
		Text: content
	}

	let keywords = await keyPhrase(params);
	let sentiment = await detectSentiment(params);
	
	console.log('keywords', keywords);
	console.log('sentiment', sentiment);	
	console.log('other random things', user_id, date, content);

	// END FNC IF NO USER LOGIN
	if (!req.body.user.id){
		return console.log('No user: all done');
	}

	// DATABASE POST EN ROUTE..
	console.log('finished')
});



//Delete route
router.delete('/12345', function(req, res){
	console.log(req.body);
	res.send(req.body);
})

//Put route - edit previous forms 

module.exports = router;






