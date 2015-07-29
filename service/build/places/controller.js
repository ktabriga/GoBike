'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Place = require('./Place');

var _Place2 = _interopRequireDefault(_Place);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var sendResponse = _api2['default'].sendResponse;

var find = sendResponse(function (req) {
  return _Place2['default'].find(req.query);
});

var create = sendResponse(function (req, res) {
  res.status(201);
  var place = new _Place2['default']({
    coordenates: req.body
  });
  return place.save()
  //return new Promise((resolve, reject) =>
  //  place.save().then(resolve, reject));
  ;
});

exports['default'] = {
  find: find,
  create: create
};
module.exports = exports['default'];