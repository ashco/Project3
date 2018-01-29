require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
// REQUIRE DREAM MODEL

// Post route
router.post('/', function(req,res,next){
	console.log('/', req.body);
	res.send(req.body);
});





