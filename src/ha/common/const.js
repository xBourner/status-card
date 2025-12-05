"use strict";
exports.__esModule = true;
exports.DOMAINS_TOGGLE = exports.UNIT_F = exports.UNIT_C = exports.BINARY_STATE_OFF = exports.BINARY_STATE_ON = exports.STATES_OFF = void 0;
exports.STATES_OFF = [
    "closed",
    "locked",
    "off",
    "docked",
    "idle",
    "standby",
    "paused",
    "auto",
    "not_home",
    "disarmed",
    "0",
];
exports.BINARY_STATE_ON = "on";
exports.BINARY_STATE_OFF = "off";
exports.UNIT_C = "°C";
exports.UNIT_F = "°F";
exports.DOMAINS_TOGGLE = new Set([
    "fan",
    "input_boolean",
    "light",
    "switch",
    "group",
    "automation",
    "humidifier",
    "valve",
]);
