"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildNodeParams = buildNodeParams;
exports.toElasticsearchQuery = toElasticsearchQuery;

var _lodash = _interopRequireDefault(require("lodash"));

var _node_types = require("../node_types");

var ast = _interopRequireWildcard(require("../ast"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function buildNodeParams(fieldName, params) {
  params = _lodash.default.pick(params, 'topLeft', 'bottomRight');

  var fieldNameArg = _node_types.nodeTypes.literal.buildNode(fieldName);

  var args = _lodash.default.map(params, function (value, key) {
    var latLon = "".concat(value.lat, ", ").concat(value.lon);
    return _node_types.nodeTypes.namedArg.buildNode(key, latLon);
  });

  return {
    arguments: [fieldNameArg].concat(_toConsumableArray(args))
  };
}

function toElasticsearchQuery(node, indexPattern) {
  var _geo_bounding_box;

  var _node$arguments = _toArray(node.arguments),
      fieldNameArg = _node$arguments[0],
      args = _node$arguments.slice(1);

  var fieldName = _node_types.nodeTypes.literal.toElasticsearchQuery(fieldNameArg);

  var field = _lodash.default.get(indexPattern, 'fields', []).find(function (field) {
    return field.name === fieldName;
  });

  var queryParams = args.reduce(function (acc, arg) {
    var snakeArgName = _lodash.default.snakeCase(arg.name);

    return _objectSpread({}, acc, _defineProperty({}, snakeArgName, ast.toElasticsearchQuery(arg)));
  }, {});

  if (field && field.scripted) {
    throw new Error("Geo bounding box query does not support scripted fields");
  }

  return {
    geo_bounding_box: (_geo_bounding_box = {}, _defineProperty(_geo_bounding_box, fieldName, queryParams), _defineProperty(_geo_bounding_box, "ignore_unmapped", true), _geo_bounding_box)
  };
}