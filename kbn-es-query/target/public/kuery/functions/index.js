"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functions = void 0;

var is = _interopRequireWildcard(require("./is"));

var and = _interopRequireWildcard(require("./and"));

var or = _interopRequireWildcard(require("./or"));

var not = _interopRequireWildcard(require("./not"));

var range = _interopRequireWildcard(require("./range"));

var exists = _interopRequireWildcard(require("./exists"));

var geoBoundingBox = _interopRequireWildcard(require("./geo_bounding_box"));

var geoPolygon = _interopRequireWildcard(require("./geo_polygon"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
var functions = {
  is: is,
  and: and,
  or: or,
  not: not,
  range: range,
  exists: exists,
  geoBoundingBox: geoBoundingBox,
  geoPolygon: geoPolygon
};
exports.functions = functions;