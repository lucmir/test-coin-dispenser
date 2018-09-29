/* global require */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var transfer = require('./routes/transfer');
var faucet = require('./routes/faucet');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
  routes
*/
app.use('/transfer', transfer);
app.use('/', faucet);

module.exports = app;
