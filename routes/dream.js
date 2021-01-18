require("dotenv").config();
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// REQUIRE MODELS
var User = require("../models/user");
var Dream = require("../models/dream");
// REQUIRE HELPER FUNCTIONS
var textAnalysis = require("./helpers/textAnalysis.js");
var dreamScraper = require("./helpers/dreamScraper.js");
var databaseAddition = require("./helpers/databaseAddition.js");

// POST ROUTE
router.post("/", async function (req, res, next) {
  let content = req.body.content;
  let user = req.body.user;
  let params = {
    LanguageCode: "en",
    Text: content,
  };

  let keywords = await textAnalysis.keyPhrase(params);
  let sentiment = await textAnalysis.detectSentiment(params);
  let descriptions = await dreamScraper.scrapeData(keywords[0]);

  if (req.body.user) {
    var postData = {
      user_id: user.id,
      date: req.body.date,
      content: content,
    };
    let database = await databaseAddition.addEntry(
      postData,
      sentiment,
      keywords[1]
    );
  } else {
    console.log("No user to add to database");
  }

  let dreamAnalysis = [];

  dreamAnalysis.push(sentiment, descriptions);

  res.send(dreamAnalysis);
});

//DELETE ROUTE
router.delete("/:id", function (req, res) {
  console.log(req.body);
  Dream.remove(
    { _id: req.body.id, user_id: req.body.user.id },
    function (err, dream) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      console.log("deleted in db");
      res.send(200);
    }
  );
});

//EDIT PUT ROUTE - load form to edit dream
router.put("/edit/:id", function (req, res) {
  Dream.update(
    { _id: req.body.id, user_id: req.body.user.id },
    {
      $set: {
        date: req.body.date,
        content: req.body.content,
      },
    },
    function (err, dream) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      console.log("edited in db", dream);
      res.send(200);
    }
  );
});

module.exports = router;
