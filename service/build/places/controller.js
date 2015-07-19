'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Place = require('./Place');

var _Place2 = _interopRequireDefault(_Place);

var find = function find(req, res, next) {
  return _Place2['default'].find(req.query).then(function (places) {
    return res.json(places);
  })['catch'](next);
};

var create = function create(req, res, next) {
  var data = {
    coordenates: req.body
  };
  var place = new _Place2['default'](data);
  place.save(function (place) {
    return res.status(201).json(place);
  }, next);
};

exports['default'] = {
  find: find,
  create: create
};
module.exports = exports['default'];