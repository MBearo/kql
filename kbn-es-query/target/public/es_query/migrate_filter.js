"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrateFilter = migrateFilter;

var _lodash = _interopRequireDefault(require("lodash"));

var _filters = require("../filters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function migrateFilter(filter, indexPattern) {
  if (filter.match) {
    var fieldName = Object.keys(filter.match)[0];

    if (isMatchPhraseFilter(filter, fieldName)) {
      var params = _lodash.default.get(filter, ['match', fieldName]);

      if (indexPattern) {
        var field = indexPattern.fields.find(function (f) {
          return f.name === fieldName;
        });

        if (field) {
          params.query = (0, _filters.getConvertedValueForField)(field, params.query);
        }
      }

      return {
        match_phrase: _defineProperty({}, fieldName, _lodash.default.omit(params, 'type'))
      };
    }
  }

  return filter;
}

function isMatchPhraseFilter(filter, fieldName) {
  return _lodash.default.get(filter, ['match', fieldName, 'type']) === 'phrase';
}