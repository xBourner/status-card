"use strict";
exports.__esModule = true;
exports.computeDomain = void 0;
var computeDomain = function (entityId) {
    return entityId.substr(0, entityId.indexOf("."));
};
exports.computeDomain = computeDomain;
