//SCRAPING
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

module.exports = {

	scrapeData: function(keywords) {

		return new Promise((resolve, reject) => {

			var descriptions = [];

			async.forEach(keywords, function(searchTerm, callback){

				var searchUrl = 'http://www.dreambible.com/search.php?q=' + searchTerm

				request(searchUrl, function(error, response, data){
					var $ = cheerio.load(data);
					var searchTermMeaning = $('body > table > tbody > tr > td:nth-child(1) > blockquote > p:nth-child(2) > font').text();					
					var searchDescription;
					console.log("searchTermMeaning",searchTermMeaning);

					if(searchTermMeaning.length < 5){
						searchDescription = null;
					} else {
						searchDescription = searchTermMeaning.split('\n')[0]
					}
						
					console.log("searchDesc",searchDescription);
								
					descriptions.push({
						name: searchTerm,
						description: searchDescription
					});

					console.log("descriptions inside scrapedata",descriptions);
					callback(null);
				})
			}, function() {
				console.log("final descriptions",descriptions);
				resolve(descriptions);
			});
		})
	}
}
