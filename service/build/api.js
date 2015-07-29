"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  sendResponse: sendResponse
};

function sendResponse(fn) {
  return function (req, res, next) {
    fn(req, res).then(res.json.bind(res))["catch"](next);
  };
}
module.exports = exports["default"];