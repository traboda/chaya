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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import shortid from 'shortid';
var emptyFunc = function () { };
var TextInput = function (_a) {
    var id = _a.id, label = _a.label, name = _a.name, placeholder = _a.placeholder, val = _a.value, _b = _a.charLimit, charLimit = _b === void 0 ? 0 : _b, className = _a.className, style = _a.style, _c = _a.hideLabel, hideLabel = _c === void 0 ? false : _c, _d = _a.required, required = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.autoFocus, autoFocus = _f === void 0 ? false : _f, spellCheck = _a.spellCheck, autoComplete = _a.autoComplete, autoCorrect = _a.autoCorrect, autoCapitalize = _a.autoCapitalize, inputStyle = _a.inputStyle, inputClassName = _a.inputClassName, type = _a.type, errorText = _a.errorText, description = _a.description, postfixRenderer = _a.postfixRenderer, _g = _a.onChange, onChange = _g === void 0 ? emptyFunc : _g, _h = _a.onFocus, onFocus = _h === void 0 ? emptyFunc : _h, _j = _a.onBlur, onBlur = _j === void 0 ? emptyFunc : _j, _k = _a.onKeyDown, onKeyDown = _k === void 0 ? emptyFunc : _k;
    var inputID = id && id.length > 1 ? id : name + "-input-" + shortid.generate();
    var _l = useState(false), isTyping = _l[0], setTyping = _l[1];
    var _m = useState(val !== null ? val : ''), value = _m[0], setValue = _m[1];
    useEffect(function () {
        setValue(val);
    }, [val]);
    var handleChange = function (e) {
        var value = e.currentTarget.value;
        if (charLimit == null || (value.length <= charLimit)) {
            if (typeof onChange === 'function')
                if (type === 'number')
                    onChange(parseInt(value));
                else
                    onChange(value);
            setValue(value);
        }
    };
    var handleFocus = function () {
        if (typeof onFocus === 'function')
            onFocus();
        setTyping(true);
    };
    var handleBlur = function () {
        if (typeof onBlur === 'function')
            onBlur();
        setTyping(false);
    };
    var props = {
        'aria-label': label,
        'aria-required': required,
        id: inputID,
        value: value,
        placeholder: placeholder || label,
        spellCheck: spellCheck,
        autoComplete: autoComplete,
        autoCorrect: autoCorrect,
        autoCapitalize: autoCapitalize,
        autoFocus: autoFocus ? 'true' : null,
        required: required,
        disabled: disabled,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        type: type,
        style: inputStyle,
    };
    return _jsx("div", __assign({ className: className, style: style }, { children: _jsxs("div", __assign({ className: "w-full py-1" }, { children: [(!hideLabel) &&
                    _jsxs("div", __assign({ className: "flex flex-wrap mb-2 px-1 mx-0" }, { children: [_jsx("div", __assign({ className: "w-2/3 px-0" }, { children: _jsxs("label", __assign({ htmlFor: inputID, "aria-hidden": false }, { children: [label, required && _jsx("span", __assign({ className: "required-marker" }, { children: "*" }), void 0)] }), void 0) }), void 0), ((typeof value !== 'number' && (value === null || value === void 0 ? void 0 : value.length) > 0) && isTyping && charLimit > 0) &&
                                _jsxs("div", __assign({ className: "w-1/3 opacity-80 px-1 flex items-end justify-end" }, { children: [value === null || value === void 0 ? void 0 : value.length, "/", charLimit] }), void 0)] }), void 0), _jsxs("div", __assign({ className: "relative" }, { children: [_jsx("input", __assign({}, props, { className: inputClassName, onKeyDown: onKeyDown }), void 0), postfixRenderer && _jsx("div", { children: postfixRenderer }, void 0)] }), void 0), errorText &&
                    _jsx("div", __assign({ className: "text-red-400 mt-1" }, { children: errorText }), void 0), description &&
                    _jsx("div", __assign({ className: "mt-2", style: { opacity: 0.75, fontSize: '10px' } }, { children: description }), void 0)] }), void 0) }), void 0);
};
export default TextInput;
