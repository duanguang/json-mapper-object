'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.isDescriptor = isDescriptor;
exports.decorate = decorate;
exports.isTargetType = isTargetType;
exports.isPrimitiveOrPrimitiveClass = isPrimitiveOrPrimitiveClass;
exports.isArrayOrArrayClass = isArrayOrArrayClass;
exports.hasAnyNullOrUndefined = hasAnyNullOrUndefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
        return false;
    }
    var keys = ['value', 'initializer', 'get', 'set'];

    for (var i = 0, l = keys.length; i < l; i++) {
        if (desc.hasOwnProperty(keys[i])) {
            return true;
        }
    }

    return false;
}
function decorate(handleDescriptor, entryArgs) {
    if (isDescriptor(entryArgs[entryArgs.length - 1])) {
        return handleDescriptor.apply(undefined, (0, _toConsumableArray3.default)(entryArgs).concat([[]]));
    } else {
        return function () {
            return handleDescriptor.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
        };
    }
}

function isTargetType(val, type) {
    return (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === type;
}

function isPrimitiveOrPrimitiveClass(obj) {
    return !!(['string', 'boolean', 'number'].indexOf(typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) > -1 || obj instanceof String || obj === String || obj instanceof Number || obj === Number || obj instanceof Boolean || obj === Boolean);
}

function isArrayOrArrayClass(clazz) {
    if (clazz === Array) {
        return true;
    }
    return Object.prototype.toString.call(clazz) === '[object Array]';
}

function hasAnyNullOrUndefined() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.some(function (arg) {
        return arg === null || arg === undefined;
    });
}