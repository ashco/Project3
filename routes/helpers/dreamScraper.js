//SCRAPING
var request = require("request");
var cheerio = require("cheerio");
var async = require("async");

module.exports = {
  scrapeData: function (keywords) {
    return new Promise((resolve, reject) => {
      var descriptions = [];

      async.forEach(
        keywords,
        function (searchTerm, callback) {
          var searchUrl =
            "http://www.dreambible.com/search.php?q=" + searchTerm.keyword;

          request(searchUrl, function (error, response, data) {
            var $ = cheerio.load(data);
            var searchTermMeaning = $(
              "body > table > tbody > tr > td:nth-child(1) > blockquote > p:nth-child(2) > font"
            ).text();
            var searchDescription;

            if (searchTermMeaning.length < 5) {
              searchDescription = null;
            } else {
              searchDescription = searchTermMeaning.split("\n")[0];
            }

            descriptions.push({
              name: searchTerm.keyword,
              score: searchTerm.score,
              description: searchDescription,
            });
            callback(null);
          });
        },
        function () {
          // remove descriptions containing links to other descriptions
          var finalDescriptions = [];
          var substring = "*Please see ";

          descriptions.forEach(function (item) {
            if (!String(item.description).includes(substring)) {
              finalDescriptions.push(item);
            }
          });

          // sort descriptions by confidence score of keyword
          finalDescriptions.sort(function (a, b) {
            return b.Score - a.Score;
          });

          // limit descriptions to only return 5
          if (finalDescriptions.length > 5) {
            finalDescriptions = finalDescriptions.splice(0, 5);
          }

          resolve(finalDescriptions);
        }
      );
    });
  },
};
