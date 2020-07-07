"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  nodeTypes: true
};
Object.defineProperty(exports, "nodeTypes", {
  enumerable: true,
  get: function () {
    return _node_types.nodeTypes;
  }
});

var _ast = require("./ast");

Object.keys(_ast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ast[key];
    }
  });
});

var _node_types = require("./node_types");