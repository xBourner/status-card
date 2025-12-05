"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.actionHandler = exports.actionHandlerBind = void 0;
var lit_1 = require("lit");
var directive_js_1 = require("lit/directive.js");
var fire_event_1 = require("../../../../common/dom/fire_event");
var deep_equal_1 = require("../../../../common/util/deep-equal");
var ActionHandler = /** @class */ (function (_super) {
    __extends(ActionHandler, _super);
    function ActionHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.holdTime = 500;
        _this.held = false;
        _this.cancelled = false;
        return _this;
    }
    ActionHandler.prototype.connectedCallback = function () {
        var _this = this;
        [
            "touchcancel",
            "mouseout",
            "mouseup",
            "touchmove",
            "mousewheel",
            "wheel",
            "scroll",
        ].forEach(function (ev) {
            document.addEventListener(ev, function () {
                _this.cancelled = true;
                if (_this.timer) {
                    clearTimeout(_this.timer);
                    _this.timer = undefined;
                }
            }, { passive: true });
        });
    };
    ActionHandler.prototype.bind = function (element, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (element.actionHandler &&
            (0, deep_equal_1.deepEqual)(options, element.actionHandler.options)) {
            return;
        }
        if (element.actionHandler) {
            element.removeEventListener("touchstart", element.actionHandler.start);
            element.removeEventListener("touchend", element.actionHandler.end);
            element.removeEventListener("touchcancel", element.actionHandler.end);
            element.removeEventListener("mousedown", element.actionHandler.start);
            element.removeEventListener("click", element.actionHandler.end);
            element.removeEventListener("keydown", element.actionHandler.handleKeyDown);
        }
        element.actionHandler = { options: options };
        if (options.disabled) {
            return;
        }
        element.actionHandler.start = function (ev) {
            _this.cancelled = false;
            var x;
            var y;
            if (ev.touches) {
                x = ev.touches[0].clientX;
                y = ev.touches[0].clientY;
            }
            else {
                x = ev.clientX;
                y = ev.clientY;
            }
            if (options.hasHold) {
                _this.held = false;
                _this.timer = window.setTimeout(function () {
                    _this.held = true;
                }, _this.holdTime);
            }
        };
        element.actionHandler.end = function (ev) {
            // Don't respond when moved or scrolled while touch
            if (ev.currentTarget !== ev.target) {
                return;
            }
            if (ev.type === "touchcancel" ||
                (ev.type === "touchend" && _this.cancelled)) {
                return;
            }
            var target = ev.target;
            // Prevent mouse event if touch event
            if (ev.cancelable) {
                ev.preventDefault();
            }
            if (options.hasHold) {
                clearTimeout(_this.timer);
                _this.timer = undefined;
            }
            if (options.hasHold && _this.held) {
                (0, fire_event_1.fireEvent)(target, "action", { action: "hold" });
            }
            else if (options.hasDoubleClick) {
                if ((ev.type === "click" && ev.detail < 2) ||
                    !_this.dblClickTimeout) {
                    _this.dblClickTimeout = window.setTimeout(function () {
                        _this.dblClickTimeout = undefined;
                        (0, fire_event_1.fireEvent)(target, "action", { action: "tap" });
                    }, 250);
                }
                else {
                    clearTimeout(_this.dblClickTimeout);
                    _this.dblClickTimeout = undefined;
                    (0, fire_event_1.fireEvent)(target, "action", { action: "double_tap" });
                }
            }
            else {
                (0, fire_event_1.fireEvent)(target, "action", { action: "tap" });
            }
        };
        element.actionHandler.handleKeyDown = function (ev) {
            if (!["Enter", " "].includes(ev.key)) {
                return;
            }
            ev.currentTarget.actionHandler.end(ev);
        };
        element.addEventListener("touchstart", element.actionHandler.start, {
            passive: true
        });
        element.addEventListener("touchend", element.actionHandler.end);
        element.addEventListener("touchcancel", element.actionHandler.end);
        element.addEventListener("mousedown", element.actionHandler.start, {
            passive: true
        });
        element.addEventListener("click", element.actionHandler.end);
        element.addEventListener("keydown", element.actionHandler.handleKeyDown);
    };
    return ActionHandler;
}(HTMLElement));
customElements.define("action-handler-status-card", ActionHandler);
var getActionHandler = function () {
    var body = document.body;
    if (body.querySelector("action-handler-status-card")) {
        return body.querySelector("action-handler-status-card");
    }
    var actionhandler = document.createElement("action-handler-status-card");
    body.appendChild(actionhandler);
    return actionhandler;
};
var actionHandlerBind = function (element, options) {
    var actionhandler = getActionHandler();
    if (!actionhandler) {
        return;
    }
    actionhandler.bind(element, options);
};
exports.actionHandlerBind = actionHandlerBind;
exports.actionHandler = (0, directive_js_1.directive)(/** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.update = function (part, _a) {
        var options = _a[0];
        (0, exports.actionHandlerBind)(part.element, options);
        return lit_1.noChange;
    };
    class_1.prototype.render = function (_options) { };
    return class_1;
}(directive_js_1.Directive)));
