"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.caseInsensitiveStringCompare = void 0;
var memoize_one_1 = __importDefault(require("memoize-one"));
var collator = (0, memoize_one_1["default"])(function (language) { return new Intl.Collator(language); });
var caseInsensitiveCollator = (0, memoize_one_1["default"])(function (language) {
    return new Intl.Collator(language, { sensitivity: "accent" });
});
var fallbackStringCompare = function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
var caseInsensitiveStringCompare = function (a, b, language) {
    if (language === void 0) { language = undefined; }
    // @ts-ignore
    if (Intl === null || Intl === void 0 ? void 0 : Intl.Collator) {
        return caseInsensitiveCollator(language).compare(a, b);
    }
    return fallbackStringCompare(a.toLowerCase(), b.toLowerCase());
};
exports.caseInsensitiveStringCompare = caseInsensitiveStringCompare;
