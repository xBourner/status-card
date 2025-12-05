"use strict";
exports.__esModule = true;
exports.deepEqual = void 0;
// From https://github.com/epoberezkin/fast-deep-equal
// MIT License - Copyright (c) 2017 Evgeny Poberezkin
var deepEqual = function (a, b) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
        if (a.constructor !== b.constructor) {
            return false;
        }
        var i = void 0;
        var length_1;
        if (Array.isArray(a)) {
            length_1 = a.length;
            if (length_1 !== b.length) {
                return false;
            }
            for (i = length_1; i-- !== 0;) {
                if (!(0, exports.deepEqual)(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) {
                return false;
            }
            for (var _i = 0, _a = a.entries(); _i < _a.length; _i++) {
                i = _a[_i];
                if (!b.has(i[0])) {
                    return false;
                }
            }
            for (var _b = 0, _c = a.entries(); _b < _c.length; _b++) {
                i = _c[_b];
                if (!(0, exports.deepEqual)(i[1], b.get(i[0]))) {
                    return false;
                }
            }
            return true;
        }
        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) {
                return false;
            }
            for (var _d = 0, _e = a.entries(); _d < _e.length; _d++) {
                i = _e[_d];
                if (!b.has(i[0])) {
                    return false;
                }
            }
            return true;
        }
        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            // @ts-ignore
            length_1 = a.length;
            // @ts-ignore
            if (length_1 !== b.length) {
                return false;
            }
            for (i = length_1; i-- !== 0;) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        if (a.constructor === RegExp) {
            return a.source === b.source && a.flags === b.flags;
        }
        if (a.valueOf !== Object.prototype.valueOf) {
            return a.valueOf() === b.valueOf();
        }
        if (a.toString !== Object.prototype.toString) {
            return a.toString() === b.toString();
        }
        var keys = Object.keys(a);
        length_1 = keys.length;
        if (length_1 !== Object.keys(b).length) {
            return false;
        }
        for (i = length_1; i-- !== 0;) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }
        for (i = length_1; i-- !== 0;) {
            var key = keys[i];
            if (!(0, exports.deepEqual)(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    // true if both NaN, false otherwise
    // eslint-disable-next-line no-self-compare
    return a !== a && b !== b;
};
exports.deepEqual = deepEqual;
