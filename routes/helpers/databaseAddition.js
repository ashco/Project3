// REQUIRE MODELS
var mongoose = require('mongoose');
var User = require('../../models/user');
var Dream = require('../../models/dream');

// TEXT ANALYSIS FNCS
module.exports = {
	// Key Phrase Check
	addEntry: function(postData, sentiment, keywords){ 
		return new Promise((resolve, reject) => {
		
	 		let dataBaseEntry = Object.assign(postData, sentiment, keywords);
	 		console.log(dataBaseEntry);

	 		Dream.create(dataBaseEntry, function(err, dream){
	 			if(err){
	 				console.log(err);
	 			}
	 			else {
	 				console.log("Got into the mainframe", dream);
	 			}
	 		});

	 		resolve(dataBaseEntry);
		});
	}
}