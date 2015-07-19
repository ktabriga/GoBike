'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

//mongodb://usuar:senha@host:port
var usuario = '';
var senha = '';
var porta = '';
var host = 'localhost';
var base = 'goBike';
var stringConnection = 'mongodb://' + usuario + senha + host + porta + '/' + base;
_mongoose2['default'].connect(stringConnection);

var db = _mongoose2['default'].connection;

db.once('open', function () {
  return console.log('Mongoose connection open.', stringConnection);
});
db.on('error', function (error) {
  return console.log('Mongoose error', error);
});