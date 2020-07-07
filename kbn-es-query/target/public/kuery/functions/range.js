"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildNodeParams = buildNodeParams;
exports.toElasticsearchQuery = toElasticsearchQuery;

var _lodash = _interopRequireDefault(require("lodash"));

var _node_types = require("../node_types");

var ast = _interopRequireWildcard(require("../ast"));

var _filters = require("../../filters");

var _get_fields = require("./utils/get_fields");

var _get_time_zone_from_settings = require("../../utils/get_time_zone_from_settings");

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
  params = _lodash.default.pick(params, 'gt', 'lt', 'gte', 'lte', 'format');
  var fieldNameArg = typeof fieldName === 'string' ? ast.fromLiteralExpression(fieldName) : _node_types.nodeTypes.literal.buildNode(fieldName);

  var args = _lodash.default.map(params, function (value, key) {
    return _node_types.nodeTypes.namedArg.buildNode(key, value);
  });

  return {
    arguments: [fieldNameArg].concat(_toConsumableArray(args))
  };
}

function toElasticsearchQuery(node) {
  var indexPattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _node$arguments = _toArray(node.arguments),
      fieldNameArg = _node$arguments[0],
      args = _node$arguments.slice(1);

  var fields = indexPattern ? (0, _get_fields.getFields)(fieldNameArg, indexPattern) : [];
  var namedArgs = extractArguments(args);

  var queryParams = _lodash.default.mapValues(namedArgs, ast.toElasticsearchQuery); // If no fields are found in the index pattern we send through the given field name as-is. We do this to preserve
  // the behaviour of lucene on dashboards where there are panels based on different index patterns that have different
  // fields. If a user queries on a field that exists in one pattern but not the other, the index pattern without the
  // field should return no results. It's debatable whether this is desirable, but it's been that way forever, so we'll
  // keep things familiar for now.


  if (fields && fields.length === 0) {
    fields.push({
      name: ast.toElasticsearchQuery(fieldNameArg),
      scripted: false
    });
  }

  var queries = fields.map(function (field) {
    if (field.scripted) {
      return {
        script: (0, _filters.getRangeScript)(field, queryParams)
      };
    } else if (field.type === 'date') {
      var timeZoneParam = config.dateFormatTZ ? {
        time_zone: (0, _get_time_zone_from_settings.getTimeZoneFromSettings)(config.dateFormatTZ)
      } : {};
      return {
        range: _defineProperty({}, field.name, _objectSpread({}, queryParams, {}, timeZoneParam))
      };
    }

    return {
      range: _defineProperty({}, field.name, queryParams)
    };
  });
  return {
    bool: {
      should: queries,
      minimum_should_match: 1
    }
  };
}

function extractArguments(args) {
  if (args.gt && args.gte || args.lt && args.lte) {
    throw new Error('range ends cannot be both inclusive and exclusive');
  }

  var unnamedArgOrder = ['gte', 'lte', 'format'];
  return args.reduce(function (acc, arg, index) {
    if (arg.type === 'namedArg') {
      acc[arg.name] = arg.value;
    } else {
      acc[unnamedArgOrder[index]] = arg;
    }

    return acc;
  }, {});
}