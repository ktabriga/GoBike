'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var router = _express2['default'].Router();

function getDirectoryFiles(directory, callback) {
  _fs2['default'].readdir(directory, function (err, files) {
    files.forEach(function (file) {
      _fs2['default'].stat(directory + '/' + file, function (err, stats) {
        if (stats.isFile()) {
          callback(directory + '/' + file);
        }
        if (stats.isDirectory()) {
          getDirectoryFiles(directory + '/' + file, callback);
        }
      });
    });
  });
}

getDirectoryFiles(__dirname, function (file) {
  _lodash2['default'].contains(file, 'run.js') ? require(file)(router) : {};
});

exports['default'] = router;
module.exports = exports['default'];