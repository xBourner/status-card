"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.applyThemesOnElement = void 0;
var applyThemesOnElement = function (element, themes, selectedTheme, themeSettings, main) {
    var _a, _b, _c, _d, _e;
    var themeToApply = selectedTheme || (main ? themes === null || themes === void 0 ? void 0 : themes.theme : undefined);
    var darkMode = (themeSettings === null || themeSettings === void 0 ? void 0 : themeSettings.dark) !== undefined
        ? themeSettings.dark
        : (themes === null || themes === void 0 ? void 0 : themes.darkMode) || false;
    if (!element.__themes) {
        element.__themes = { cacheKey: null, keys: new Set() };
    }
    var cacheKey = themeToApply || "";
    var themeRules = {};
    if (themeToApply === "default") {
        var primaryColor = themeSettings === null || themeSettings === void 0 ? void 0 : themeSettings.primaryColor;
        var accentColor = themeSettings === null || themeSettings === void 0 ? void 0 : themeSettings.accentColor;
        if (primaryColor) {
            cacheKey = "".concat(cacheKey, "__primary_").concat(primaryColor);
            themeRules["primary-color"] = String(primaryColor);
        }
        if (accentColor) {
            cacheKey = "".concat(cacheKey, "__accent_").concat(accentColor);
            themeRules["accent-color"] = String(accentColor);
        }
        if (!primaryColor &&
            !accentColor &&
            ((_a = element.__themes) === null || _a === void 0 ? void 0 : _a.cacheKey) === "default") {
            return;
        }
    }
    if (themeToApply &&
        themeToApply !== "default" &&
        ((_b = themes === null || themes === void 0 ? void 0 : themes.themes) === null || _b === void 0 ? void 0 : _b[themeToApply])) {
        var _f = themes.themes[themeToApply] || {}, modes = _f.modes, base = __rest(_f, ["modes"]);
        themeRules = __assign(__assign({}, themeRules), base);
        if (modes) {
            if (darkMode && modes.dark) {
                themeRules = __assign(__assign({}, themeRules), modes.dark);
            }
            else if (!darkMode && modes.light) {
                themeRules = __assign(__assign({}, themeRules), modes.light);
            }
        }
    }
    else if (!themeToApply &&
        (!((_c = element.__themes) === null || _c === void 0 ? void 0 : _c.keys) ||
            element.__themes.keys.size === 0)) {
        return;
    }
    var prevKeys = ((_d = element.__themes) === null || _d === void 0 ? void 0 : _d.keys) || new Set();
    var newKeys = new Set(Object.keys(themeRules));
    if (themeToApply === "default" && newKeys.size === 0) {
        for (var _i = 0, prevKeys_1 = prevKeys; _i < prevKeys_1.length; _i++) {
            var key = prevKeys_1[_i];
            try {
                element.style.removeProperty("--".concat(key));
            }
            catch (_g) { }
        }
        element.__themes = { cacheKey: "default", keys: new Set() };
        return;
    }
    if (((_e = element.__themes) === null || _e === void 0 ? void 0 : _e.cacheKey) === cacheKey) {
        var same = true;
        if (prevKeys.size !== newKeys.size) {
            same = false;
        }
        else {
            for (var _h = 0, prevKeys_2 = prevKeys; _h < prevKeys_2.length; _h++) {
                var k = prevKeys_2[_h];
                if (!newKeys.has(k)) {
                    same = false;
                    break;
                }
            }
        }
        if (same)
            return;
    }
    for (var _j = 0, prevKeys_3 = prevKeys; _j < prevKeys_3.length; _j++) {
        var key = prevKeys_3[_j];
        if (!newKeys.has(key)) {
            try {
                element.style.removeProperty("--".concat(key));
            }
            catch (_k) { }
        }
    }
    for (var _l = 0, _m = Object.entries(themeRules); _l < _m.length; _l++) {
        var _o = _m[_l], key = _o[0], value = _o[1];
        element.style.setProperty("--".concat(key), String(value));
    }
    element.__themes.cacheKey = cacheKey || null;
    element.__themes.keys = newKeys;
};
exports.applyThemesOnElement = applyThemesOnElement;
