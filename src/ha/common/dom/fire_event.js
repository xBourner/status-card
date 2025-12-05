"use strict";
exports.__esModule = true;
exports.fireEvent = void 0;
var fireEvent = function (node, type, detail, options) {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    var event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};
exports.fireEvent = fireEvent;
