//SCRAPING
var request = require('request');
var cheerio = require('cheerio');

// Keywords to be pulled in based on sorted user inputs (below are hard coded for testing purposes)
var keywords = ['tigers', 'marathons', 'jungle', 'fdssfsfdsfds']

// Empty array we will pass our found descriptions in, this could be handled differently dependent on where this function is run
var descriptions = [];

// This function loops through to pass what is needed into each round of the web scraping
function loopKeywordArray(keywords) {
	for (var i = 0; i < keywords.length; i++) {
		var searchTerm = keywords[i];
		var indexNum = i;
		// Sending through index number and searchterm will help us link it to the returned descriptions later
		// (but we may not need to worry about that in the long run dependent on where this function lives)
		scrapeData(searchTerm, indexNum);
	}	
}

// Web scraper is run individually for each word, it does a query based on search term
function scrapeData(searchTerm, indexNum) {
	let searchUrl = 'http://www.dreambible.com/search.php?q=' + searchTerm
	request(searchUrl, function(error, response, data){
		var $ = cheerio.load(data);
		
		//This selector finds the main description block on the page, no need to map multiple items as it's just one big section of content
		var searchTermMeaning = $('body > table > tbody > tr > td:nth-child(1) > blockquote > p:nth-child(2) > font').text();
		
		//If a description is found, then add it to our array that we will send back
	
			descriptions.push({
				name: searchTerm,
				index: indexNum,
				description: searchTermMeaning
			})
			console.log('New data added', descriptions);
	
	})
}

loopKeywordArray(keywords);