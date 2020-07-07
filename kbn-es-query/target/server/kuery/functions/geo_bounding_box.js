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
function buildNodeParams(fieldName, params) {
  params = _lodash.default.pick(params, 'topLeft', 'bottomRight');

  const fieldNameArg = _node_types.nodeTypes.literal.buildNode(fieldName);

  const args = _lodash.default.map(params, (value, key) => {
    const latLon = `${value.lat}, ${value.lon}`;
    return _node_types.nodeTypes.namedArg.buildNode(key, latLon);
  });

  return {
    arguments: [fieldNameArg, ...args]
  };
}

function toElasticsearchQuery(node, indexPattern) {
  const [fieldNameArg, ...args] = node.arguments;

  const fieldName = _node_types.nodeTypes.literal.toElasticsearchQuery(fieldNameArg);

  const field = _lodash.default.get(indexPattern, 'fields', []).find(field => field.name === fieldName);

  const queryParams = args.reduce((acc, arg) => {
    const snakeArgName = _lodash.default.snakeCase(arg.name);

    return { ...acc,
      [snakeArgName]: ast.toElasticsearchQuery(arg)
    };
  }, {});

  if (field && field.scripted) {
    throw new Error(`Geo bounding box query does not support scripted fields`);
  }

  return {
    geo_bounding_box: {
      [fieldName]: queryParams,
      ignore_unmapped: true
    }
  };
}