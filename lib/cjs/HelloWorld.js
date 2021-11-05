"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_1 = __importDefault(require("@emotion/styled"));
var StyledDiv = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: #444;\n  border-radius: 7px;\n  padding: 1rem 1.5rem;\n  margin: 1rem 0;\n"], ["\n  background: #444;\n  border-radius: 7px;\n  padding: 1rem 1.5rem;\n  margin: 1rem 0;\n"])));
var HelloWorld = function (_a) {
    var _b = _a.initialValue, initialValue = _b === void 0 ? 0 : _b;
    var _c = (0, react_1.useState)(initialValue), counter = _c[0], setCounter = _c[1];
    (0, react_1.useEffect)(function () {
        console.log(initialValue, counter);
    }, [counter]);
    return ((0, jsx_runtime_1.jsxs)(StyledDiv, __assign({ onClick: function () { return setCounter(counter + 1); } }, { children: ["This works? ", counter] }), void 0));
};
exports.default = HelloWorld;
var templateObject_1;
