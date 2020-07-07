"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQueryFromKuery = buildQueryFromKuery;

var _kuery = require("../kuery");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildQueryFromKuery(indexPattern) {
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var allowLeadingWildcards = arguments.length > 2 ? arguments[2] : undefined;
  var dateFormatTZ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var queryASTs = queries.map(function (query) {
    return (0, _kuery.fromKueryExpression)(query.query, {
      allowLeadingWildcards: allowLeadingWildcards
    });
  });
  return buildQuery(indexPattern, queryASTs, {
    dateFormatTZ: dateFormatTZ
  });
}

function buildQuery(indexPattern, queryASTs) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var compoundQueryAST = _kuery.nodeTypes.function.buildNode('and', queryASTs);

  var kueryQuery = (0, _kuery.toElasticsearchQuery)(compoundQueryAST, indexPattern, config);
  return _objectSpread({
    must: [],
    filter: [],
    should: [],
    must_not: []
  }, kueryQuery.bool);
}