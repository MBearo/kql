"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildNodeParams = buildNodeParams;
exports.toElasticsearchQuery = toElasticsearchQuery;

var _lodash = require("lodash");

var _node_types = require("../node_types");

var ast = _interopRequireWildcard(require("../ast"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function buildNodeParams(fieldName, points) {
  var fieldNameArg = _node_types.nodeTypes.literal.buildNode(fieldName);

  var args = points.map(function (point) {
    var latLon = "".concat(point.lat, ", ").concat(point.lon);
    return _node_types.nodeTypes.literal.buildNode(latLon);
  });
  return {
    arguments: [fieldNameArg].concat(_toConsumableArray(args))
  };
}

function toElasticsearchQuery(node, indexPattern) {
  var _geo_polygon;

  var _node$arguments = _toArray(node.arguments),
      fieldNameArg = _node$arguments[0],
      points = _node$arguments.slice(1);

  var fieldName = _node_types.nodeTypes.literal.toElasticsearchQuery(fieldNameArg);

  var field = (0, _lodash.get)(indexPattern, 'fields', []).find(function (field) {
    return field.name === fieldName;
  });
  var queryParams = {
    points: points.map(ast.toElasticsearchQuery)
  };

  if (field && field.scripted) {
    throw new Error("Geo polygon query does not support scripted fields");
  }

  return {
    geo_polygon: (_geo_polygon = {}, _defineProperty(_geo_polygon, fieldName, queryParams), _defineProperty(_geo_polygon, "ignore_unmapped", true), _geo_polygon)
  };
}