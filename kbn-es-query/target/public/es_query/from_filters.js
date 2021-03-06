"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQueryFromFilters = buildQueryFromFilters;

var _lodash = _interopRequireDefault(require("lodash"));

var _migrate_filter = require("./migrate_filter");

var _filter_matches_index = require("./filter_matches_index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Create a filter that can be reversed for filters with negate set
 * @param {boolean} reverse This will reverse the filter. If true then
 *                          anything where negate is set will come
 *                          through otherwise it will filter out
 * @returns {function}
 */
var filterNegate = function filterNegate(reverse) {
  return function (filter) {
    if (_lodash.default.isUndefined(filter.meta) || _lodash.default.isUndefined(filter.meta.negate)) return !reverse;
    return filter.meta && filter.meta.negate === reverse;
  };
};
/**
 * Translate a filter into a query to support es 5+
 * @param  {Object} filter - The filter to translate
 * @return {Object} the query version of that filter
 */


var translateToQuery = function translateToQuery(filter) {
  if (!filter) return;

  if (filter.query) {
    return filter.query;
  }

  return filter;
};
/**
 * Clean out any invalid attributes from the filters
 * @param {object} filter The filter to clean
 * @returns {object}
 */


var cleanFilter = function cleanFilter(filter) {
  return _lodash.default.omit(filter, ['meta', '$state']);
};

function buildQueryFromFilters() {
  var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var indexPattern = arguments.length > 1 ? arguments[1] : undefined;
  var ignoreFilterIfFieldNotInIndex = arguments.length > 2 ? arguments[2] : undefined;
  return {
    must: [],
    filter: filters.filter(filterNegate(false)).filter(function (filter) {
      return !ignoreFilterIfFieldNotInIndex || (0, _filter_matches_index.filterMatchesIndex)(filter, indexPattern);
    }).map(translateToQuery).map(cleanFilter).map(function (filter) {
      return (0, _migrate_filter.migrateFilter)(filter, indexPattern);
    }),
    should: [],
    must_not: filters.filter(filterNegate(true)).filter(function (filter) {
      return !ignoreFilterIfFieldNotInIndex || (0, _filter_matches_index.filterMatchesIndex)(filter, indexPattern);
    }).map(translateToQuery).map(cleanFilter).map(function (filter) {
      return (0, _migrate_filter.migrateFilter)(filter, indexPattern);
    })
  };
}