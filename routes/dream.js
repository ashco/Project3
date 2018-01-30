require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// REQUIRE MODELS
var User = require('../models/user');
var Dream = require('../models/dream');
// REQUIRE HELPER FUNCTIONS
var textAnalysis = require('./helpers/textAnalysis.js');


// TEXT ANALYSIS FNCS
// function keyPhrase(params){ // Key Phrase Check
// 	return new Promise((resolve, reject) => {
// 		comprehend.detectKeyPhrases(params, function(err, data) {	
// 			if (err) {
// 				reject(err); 
// 				return;
// 			}  
// 			resolve(dataCleanse.dataFormat(data)); // Successful Response	
// 		});
// 	});
// }


// function detectSentiment(params){ //Sentiment Check
// 	return new Promise((resolve, reject) => {
// 		comprehend.detectSentiment(params, function(err, data) { 
// 			if (err) {
// 				reject(err);
// 				return; 
// 			}
// 			resolve(data); // Successful Response
// 		});
// 	});
// }






// POST ROUTE
router.post('/', async function(req, res, next){
	let user_id = req.body.user.id;
	let date = req.body.date;
	let content = req.body.content;
	let params = {
		LanguageCode: 'en',
		Text: content
	}

	let keywords = await textAnalysis.keyPhrase(params);
	let sentiment = await textAnalysis.detectSentiment(params);
	
	console.log('keywords', keywords);
	console.log('sentiment', sentiment);	
	console.log('other random things', user_id, date, content);

	// END FNC IF NO USER LOGIN
	if (!req.body.user.id){
		return console.log('No user: all done');
	}

	// DATABASE POST EN ROUTE..

});





//DELETE ROUTE
router.delete('/12345', function(req, res){
	console.log(req.body);
	res.send(req.body);
})





//PUT ROUTE - edit previous forms 

module.exports = router;






