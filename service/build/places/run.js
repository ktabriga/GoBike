'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function run(router) {
  router.route('/places').get(_controller2['default'].find).post(_controller2['default'].create);
}

exports['default'] = run;
module.exports = exports['default'];