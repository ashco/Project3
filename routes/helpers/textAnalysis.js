// REQUIRE AWS API
var AWS = require('aws-sdk');
// AWS.config.update({region: 'us-west-2'});
AWS.config.loadFromPath('./awsconfig.json');
var comprehend = new AWS.Comprehend();
// REQUIRE HELPER FUNCTIONS
var dataCleanse = require('./dataCleanse.js');

// TEXT ANALYSIS FNCS
module.exports = {
	// Key Phrase Check
	keyPhrase: function(params){ 
		return new Promise((resolve, reject) => {
			comprehend.detectKeyPhrases(params, function(err, data) {	
				if (err) {
					reject(err); 
					return;
				}  
				resolve(dataCleanse.dataFormat(data)); // Successful Response	
			});
		});
	},

	//Sentiment Check
	detectSentiment: function(params){ 
		return new Promise((resolve, reject) => {
			comprehend.detectSentiment(params, function(err, data) { 
				if (err) {
					reject(err);
					return; 
				}
				resolve(data); // Successful Response
			});
		});
	}
}