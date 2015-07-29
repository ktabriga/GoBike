'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var livereload = require('livereload');
var server = livereload.createServer();
require('./router');
require('./mongooseConnection');

var app = express();
var basePath = __dirname.split('service')[0];
console.log(basePath);
//active livereload to client
server.watch(path.join(basePath, 'client'));
// view engine setup
app.set('views', path.join(basePath, 'client', 'templates'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express['static'](path.join(basePath, 'client')));

//Serve index.html
app.get('/', function (req, res) {
  res.render('index.html');
});

//Define router
var router = require('./router');
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 400).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 400).json({
    message: err.message,
    error: {}
  });
});

module.exports = app;