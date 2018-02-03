//SCRAPING
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

module.exports = {

	scrapeData: function(keywords) {

		return new Promise((resolve, reject) => {

			var descriptions = [];

			async.forEach(keywords, function(searchTerm, callback){
				console.log('search term', searchTerm.keyword)
				console.log('search score', searchTerm.score)

				var searchUrl = 'http://www.dreambible.com/search.php?q=' + searchTerm.keyword

				request(searchUrl, function(error, response, data){
					var $ = cheerio.load(data);
					var searchTermMeaning = $('body > table > tbody > tr > td:nth-child(1) > blockquote > p:nth-child(2) > font').text();					
					var searchDescription;

					if(searchTermMeaning.length < 5){
						searchDescription = null;
					} else {
						searchDescription = searchTermMeaning.split('\n')[0]
					}
								
					descriptions.push({
						name: searchTerm.keyword,
						score: searchTerm.score,
						description: searchDescription
					});

					
					callback(null);
				})
			}, function() {

				// sort descriptions by confidence score of keyword
				descriptions.sort(function(a, b) {
					return b.Score - a.Score ;
				});

				// limit descriptions to only return 5
				if (descriptions.length > 5){
					descriptions = descriptions.splice(0, 5);
				}	

				resolve(descriptions);
			});
		})
	}
}
