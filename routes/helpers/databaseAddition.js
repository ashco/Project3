// REQUIRE MODELS
var mongoose = require('mongoose');
var User = require('../../models/user');
var Dream = require('../../models/dream');

// TEXT ANALYSIS FNCS
module.exports = {
	// Key Phrase Check
	addEntry: function(postData, sentiment, keywords){ 
		return new Promise((resolve, reject) => {
			
			let sentimentEntry = {
	  			sentiment: sentiment.Sentiment.toLowerCase(),
	  			score_positive: Number((sentiment.SentimentScore.Positive).toFixed(3)),
	  			score_negative: Number((sentiment.SentimentScore.Negative).toFixed(3)),
	  			score_neutral: Number((sentiment.SentimentScore.Neutral).toFixed(3)),
	 			score_mixed: Number((sentiment.SentimentScore.Mixed).toFixed(3)),
			}
	
	 		let dataBaseEntry = Object.assign(postData, sentimentEntry, keywords);
	 		console.log(dataBaseEntry);
	 		resolve(dataBaseEntry);

	 		Dream.create(dataBaseEntry, function(err, dream){
	 			if(err){
	 				console.log(err);
	 			}
	 			else {
	 				console.log("Got into the mainframe", dream);
	 				resolve(dream);
	 			}
	 		});

		});
	}
}