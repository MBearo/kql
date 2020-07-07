"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromLiteralExpression = fromLiteralExpression;
exports.fromKueryExpression = fromKueryExpression;
exports.toElasticsearchQuery = toElasticsearchQuery;
exports.doesKueryExpressionHaveLuceneSyntaxError = doesKueryExpressionHaveLuceneSyntaxError;

var _lodash = _interopRequireDefault(require("lodash"));

var _index = require("../node_types/index");

var _kuery = require("./kuery");

var _errors = require("../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fromLiteralExpression(expression, parseOptions) {
  parseOptions = _objectSpread({}, parseOptions, {
    startRule: 'Literal'
  });
  return fromExpression(expression, parseOptions, _kuery.parse);
}

function fromKueryExpression(expression, parseOptions) {
  try {
    return fromExpression(expression, parseOptions, _kuery.parse);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      throw new _errors.KQLSyntaxError(error, expression);
    } else {
      throw error;
    }
  }
}

function fromExpression(expression) {
  var parseOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _kuery.parse;

  if (_lodash.default.isUndefined(expression)) {
    throw new Error('expression must be a string, got undefined instead');
  }

  parseOptions = _objectSpread({}, parseOptions, {
    helpers: {
      nodeTypes: _index.nodeTypes
    }
  });
  return parse(expression, parseOptions);
}
/**
 * @params {String} indexPattern
 * @params {Object} config - contains the dateFormatTZ
 *
 * IndexPattern isn't required, but if you pass one in, we can be more intelligent
 * about how we craft the queries (e.g. scripted fields)
 */


function toElasticsearchQuery(node, indexPattern) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!node || !node.type || !_index.nodeTypes[node.type]) {
    return toElasticsearchQuery(_index.nodeTypes.function.buildNode('and', []));
  }

  return _index.nodeTypes[node.type].toElasticsearchQuery(node, indexPattern, config);
}

function doesKueryExpressionHaveLuceneSyntaxError(expression) {
  try {
    fromExpression(expression, {
      errorOnLuceneSyntax: true
    }, _kuery.parse);
    return false;
  } catch (e) {
    return e.message.startsWith('Lucene');
  }
}