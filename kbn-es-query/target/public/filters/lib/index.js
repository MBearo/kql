"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FILTERS: true,
  CustomFilter: true,
  ExistsFilter: true,
  isExistsFilter: true,
  GeoBoundingBoxFilter: true,
  isGeoBoundingBoxFilter: true,
  GeoPolygonFilter: true,
  isGeoPolygonFilter: true,
  PhraseFilter: true,
  isPhraseFilter: true,
  isScriptedPhraseFilter: true,
  PhrasesFilter: true,
  isPhrasesFilter: true,
  QueryStringFilter: true,
  isQueryStringFilter: true,
  RangeFilter: true,
  isRangeFilter: true,
  isScriptedRangeFilter: true,
  RangeFilterParams: true,
  MatchAllFilter: true,
  isMatchAllFilter: true,
  MissingFilter: true,
  isMissingFilter: true
};
Object.defineProperty(exports, "CustomFilter", {
  enumerable: true,
  get: function get() {
    return _custom_filter.CustomFilter;
  }
});
Object.defineProperty(exports, "ExistsFilter", {
  enumerable: true,
  get: function get() {
    return _exists_filter.ExistsFilter;
  }
});
Object.defineProperty(exports, "isExistsFilter", {
  enumerable: true,
  get: function get() {
    return _exists_filter.isExistsFilter;
  }
});
Object.defineProperty(exports, "GeoBoundingBoxFilter", {
  enumerable: true,
  get: function get() {
    return _geo_bounding_box_filter.GeoBoundingBoxFilter;
  }
});
Object.defineProperty(exports, "isGeoBoundingBoxFilter", {
  enumerable: true,
  get: function get() {
    return _geo_bounding_box_filter.isGeoBoundingBoxFilter;
  }
});
Object.defineProperty(exports, "GeoPolygonFilter", {
  enumerable: true,
  get: function get() {
    return _geo_polygon_filter.GeoPolygonFilter;
  }
});
Object.defineProperty(exports, "isGeoPolygonFilter", {
  enumerable: true,
  get: function get() {
    return _geo_polygon_filter.isGeoPolygonFilter;
  }
});
Object.defineProperty(exports, "PhraseFilter", {
  enumerable: true,
  get: function get() {
    return _phrase_filter.PhraseFilter;
  }
});
Object.defineProperty(exports, "isPhraseFilter", {
  enumerable: true,
  get: function get() {
    return _phrase_filter.isPhraseFilter;
  }
});
Object.defineProperty(exports, "isScriptedPhraseFilter", {
  enumerable: true,
  get: function get() {
    return _phrase_filter.isScriptedPhraseFilter;
  }
});
Object.defineProperty(exports, "PhrasesFilter", {
  enumerable: true,
  get: function get() {
    return _phrases_filter.PhrasesFilter;
  }
});
Object.defineProperty(exports, "isPhrasesFilter", {
  enumerable: true,
  get: function get() {
    return _phrases_filter.isPhrasesFilter;
  }
});
Object.defineProperty(exports, "QueryStringFilter", {
  enumerable: true,
  get: function get() {
    return _query_string_filter.QueryStringFilter;
  }
});
Object.defineProperty(exports, "isQueryStringFilter", {
  enumerable: true,
  get: function get() {
    return _query_string_filter.isQueryStringFilter;
  }
});
Object.defineProperty(exports, "RangeFilter", {
  enumerable: true,
  get: function get() {
    return _range_filter.RangeFilter;
  }
});
Object.defineProperty(exports, "isRangeFilter", {
  enumerable: true,
  get: function get() {
    return _range_filter.isRangeFilter;
  }
});
Object.defineProperty(exports, "isScriptedRangeFilter", {
  enumerable: true,
  get: function get() {
    return _range_filter.isScriptedRangeFilter;
  }
});
Object.defineProperty(exports, "RangeFilterParams", {
  enumerable: true,
  get: function get() {
    return _range_filter.RangeFilterParams;
  }
});
Object.defineProperty(exports, "MatchAllFilter", {
  enumerable: true,
  get: function get() {
    return _match_all_filter.MatchAllFilter;
  }
});
Object.defineProperty(exports, "isMatchAllFilter", {
  enumerable: true,
  get: function get() {
    return _match_all_filter.isMatchAllFilter;
  }
});
Object.defineProperty(exports, "MissingFilter", {
  enumerable: true,
  get: function get() {
    return _missing_filter.MissingFilter;
  }
});
Object.defineProperty(exports, "isMissingFilter", {
  enumerable: true,
  get: function get() {
    return _missing_filter.isMissingFilter;
  }
});
exports.FILTERS = void 0;

var _meta_filter = require("./meta_filter");

Object.keys(_meta_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _meta_filter[key];
    }
  });
});

var _custom_filter = require("./custom_filter");

var _exists_filter = require("./exists_filter");

var _geo_bounding_box_filter = require("./geo_bounding_box_filter");

var _geo_polygon_filter = require("./geo_polygon_filter");

var _phrase_filter = require("./phrase_filter");

var _phrases_filter = require("./phrases_filter");

var _query_string_filter = require("./query_string_filter");

var _range_filter = require("./range_filter");

var _match_all_filter = require("./match_all_filter");

var _missing_filter = require("./missing_filter");

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
// The interface the other filters extend
// The actual filter types
var FILTERS;
exports.FILTERS = FILTERS;

(function (FILTERS) {
  FILTERS["CUSTOM"] = "custom";
  FILTERS["PHRASES"] = "phrases";
  FILTERS["PHRASE"] = "phrase";
  FILTERS["EXISTS"] = "exists";
  FILTERS["MATCH_ALL"] = "match_all";
  FILTERS["MISSING"] = "missing";
  FILTERS["QUERY_STRING"] = "query_string";
  FILTERS["RANGE"] = "range";
  FILTERS["GEO_BOUNDING_BOX"] = "geo_bounding_box";
  FILTERS["GEO_POLYGON"] = "geo_polygon";
  FILTERS["SPATIAL_FILTER"] = "spatial_filter";
})(FILTERS || (exports.FILTERS = FILTERS = {}));