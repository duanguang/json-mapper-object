export function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
        return false;
    }
    const keys = ['value', 'initializer', 'get', 'set'];

    for (let i = 0, l = keys.length; i < l; i++) {
        if (desc.hasOwnProperty(keys[i])) {
            return true;
        }
    }

    return false;
}
export function decorate(handleDescriptor, entryArgs) {
    if (isDescriptor(entryArgs[entryArgs.length - 1])) {
        return handleDescriptor(...entryArgs, []);
    } else {
        return function () {
            return handleDescriptor(...arguments, entryArgs);
        };
    }
}

export function isTargetType(val, type) {
    return typeof val === type;
}

export function isPrimitiveOrPrimitiveClass(obj) {
    return !!(['string', 'boolean', 'number'].indexOf((typeof obj)) > -1 || (obj instanceof String || obj === String ||
    obj instanceof Number || obj === Number ||
    obj instanceof Boolean || obj === Boolean));
}

export function isArrayOrArrayClass(clazz) {
    if (clazz === Array) {
        return true;
    }
    return Object.prototype.toString.call(clazz) === '[object Array]'
}

export function hasAnyNullOrUndefined(...args) {
    return args.some((arg) =>{return arg === null || arg === undefined});
}