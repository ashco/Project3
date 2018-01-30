require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// REQUIRE MODELS
var User = require('../models/user');
var Dream = require('../models/dream');
// REQUIRE HELPER FUNCTIONS
var textAnalysis = require('./helpers/textAnalysis.js');
var dreamScraper = require('./helpers/dreamScraper.js');
var databaseAddition = require('./helpers/databaseAddition.js')

// POST ROUTE
router.post('/', async function(req, res, next){
	
	let content = req.body.content;

	let postData = {
		user_id: req.body.user.id,
		date: req.body.date,
		content: content
	}
	console.log(postData,"postData");

	let params = {
		LanguageCode: 'en',
		Text: content
	}

	let keywords = await textAnalysis.keyPhrase(params);
	let sentiment = await textAnalysis.detectSentiment(params);
	let database = await databaseAddition.addEntry(postData, sentiment, keywords[1]);
	

	// await Dream.create(database, function(err, dream){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	else {
	// 		console.log("Adding to db", dream);
	// 	}
	// });

	// console.log('keywords', keywords);
	// console.log('sentiment', sentiment);	
	// console.log('other random things', user_id, date, content);

	// END FNC IF NO USER LOGIN
	if (!req.body.user.id){
		return console.log('No user: all done');
	}

	res.send(database);

	// DATABASE POST EN ROUTE..

});





//DELETE ROUTE
router.delete('/12345', function(req, res){
	console.log(req.body);
	res.send(req.body);
})





//PUT ROUTE - edit previous forms 

module.exports = router;






