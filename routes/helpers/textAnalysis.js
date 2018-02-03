// REQUIRE AWS API
require('dotenv').config();
var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./awsconfig.json');
AWS.config.update({region: 'us-west-2'});
new AWS.Credentials(process.env.AWS_KEY_ID, process.env.AWS_SECRET_KEY);


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
				resolve(dataCleanse.keywordFormat(data)); // Successful Response	
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
				resolve(dataCleanse.sentimentFormat(data)); // Successful Response
			});
		});
	}
}