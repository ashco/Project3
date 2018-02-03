require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
//Heroku requirement



// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dream_app_db', {useMongoClient: true});

// Set up middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./routes/auth'));
app.use('/dream', require('./routes/dream'));
app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));

app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;



var server = app.listen(process.env.PORT || 4000);