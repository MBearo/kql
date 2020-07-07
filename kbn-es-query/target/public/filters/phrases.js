"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPhrasesFilter = buildPhrasesFilter;

var _phrase = require("./phrase");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Creates a filter where the given field matches one or more of the given values
// params should be an array of values
function buildPhrasesFilter(field, params, indexPattern) {
  var index = indexPattern.id;
  var type = 'phrases';
  var key = field.name;
  var value = params.map(function (value) {
    return format(field, value);
  }).join(', ');
  var filter = {
    meta: {
      index: index,
      type: type,
      key: key,
      value: value,
      params: params
    }
  };
  var should;

  if (field.scripted) {
    should = params.map(function (value) {
      return {
        script: (0, _phrase.getPhraseScript)(field, value)
      };
    });
  } else {
    should = params.map(function (value) {
      return {
        match_phrase: _defineProperty({}, field.name, value)
      };
    });
  }

  filter.query = {
    bool: {
      should: should,
      minimum_should_match: 1
    }
  };
  return filter;
}

function format(field, value) {
  return field && field.format && field.format.convert ? field.format.convert(value) : value;
}