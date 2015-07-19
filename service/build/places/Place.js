'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var PlaceSchema = new _mongoose2['default'].Schema({
  date: {
    type: Date,
    'default': new Date()
  },
  coordenates: [{
    latitude: Number,
    longitude: Number
  }]
});

exports['default'] = _mongoose2['default'].model('Place', PlaceSchema);
module.exports = exports['default'];