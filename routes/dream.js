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
	let user = req.body.user;

	let params = {
		LanguageCode: 'en',
		Text: content
	}

	let keywords = await textAnalysis.keyPhrase(params);
	let sentiment = await textAnalysis.detectSentiment(params);
	let descriptions = await dreamScraper.scrapeData(keywords[0]);

	if(req.body.user) {
		var postData = {
			user_id: user.id,
			date: req.body.date,
			content: content
		}
		let database = await databaseAddition.addEntry(postData, sentiment, keywords[1]);
	} else {
		console.log("No user to add to datbase");
	}
	
	let dreamAnalysis = Object.assign(sentiment, descriptions);

	res.send(dreamAnalysis);

});





//DELETE ROUTE
router.delete('/12345', function(req, res){
	console.log(req.body);
	res.send(req.body);
})





//PUT ROUTE - edit previous forms 

module.exports = router;






