"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromLiteralExpression = fromLiteralExpression;
exports.fromKueryExpression = fromKueryExpression;
exports.toElasticsearchQuery = toElasticsearchQuery;
exports.doesKueryExpressionHaveLuceneSyntaxError = doesKueryExpressionHaveLuceneSyntaxError;

var _lodash = _interopRequireDefault(require("lodash"));

var _index = require("../node_types/index");

var _kuery = require("./kuery");

var _errors = require("../errors");

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
function fromLiteralExpression(expression, parseOptions) {
  parseOptions = { ...parseOptions,
    startRule: 'Literal'
  };
  return fromExpression(expression, parseOptions, _kuery.parse);
}

function fromKueryExpression(expression, parseOptions) {
  try {
    return fromExpression(expression, parseOptions, _kuery.parse);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      throw new _errors.KQLSyntaxError(error, expression);
    } else {
      throw error;
    }
  }
}

function fromExpression(expression, parseOptions = {}, parse = _kuery.parse) {
  if (_lodash.default.isUndefined(expression)) {
    throw new Error('expression must be a string, got undefined instead');
  }

  parseOptions = { ...parseOptions,
    helpers: {
      nodeTypes: _index.nodeTypes
    }
  };
  return parse(expression, parseOptions);
}
/**
 * @params {String} indexPattern
 * @params {Object} config - contains the dateFormatTZ
 *
 * IndexPattern isn't required, but if you pass one in, we can be more intelligent
 * about how we craft the queries (e.g. scripted fields)
 */


function toElasticsearchQuery(node, indexPattern, config = {}) {
  if (!node || !node.type || !_index.nodeTypes[node.type]) {
    return toElasticsearchQuery(_index.nodeTypes.function.buildNode('and', []));
  }

  return _index.nodeTypes[node.type].toElasticsearchQuery(node, indexPattern, config);
}

function doesKueryExpressionHaveLuceneSyntaxError(expression) {
  try {
    fromExpression(expression, {
      errorOnLuceneSyntax: true
    }, _kuery.parse);
    return false;
  } catch (e) {
    return e.message.startsWith('Lucene');
  }
}