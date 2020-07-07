"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildNode = buildNode;
exports.buildNodeWithArgumentNodes = buildNodeWithArgumentNodes;
exports.toElasticsearchQuery = toElasticsearchQuery;

var _lodash = _interopRequireDefault(require("lodash"));

var _functions = require("../functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildNode(functionName) {
  var kueryFunction = _functions.functions[functionName];

  if (_lodash.default.isUndefined(kueryFunction)) {
    throw new Error("Unknown function \"".concat(functionName, "\""));
  }

  for (var _len = arguments.length, functionArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    functionArgs[_key - 1] = arguments[_key];
  }

  return _objectSpread({
    type: 'function',
    function: functionName
  }, kueryFunction.buildNodeParams.apply(kueryFunction, functionArgs));
} // Mainly only useful in the grammar where we'll already have real argument nodes in hand


function buildNodeWithArgumentNodes(functionName, argumentNodes) {
  if (_lodash.default.isUndefined(_functions.functions[functionName])) {
    throw new Error("Unknown function \"".concat(functionName, "\""));
  }

  return {
    type: 'function',
    function: functionName,
    arguments: argumentNodes
  };
}

function toElasticsearchQuery(node, indexPattern) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var kueryFunction = _functions.functions[node.function];
  return kueryFunction.toElasticsearchQuery(node, indexPattern, config);
}