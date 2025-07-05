'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getMetadata = require('babel-runtime/core-js/reflect/get-metadata');

var _getMetadata2 = _interopRequireDefault(_getMetadata);

var _metadata = require('babel-runtime/core-js/reflect/metadata');

var _metadata2 = _interopRequireDefault(_metadata);

var _util = require('./util');

require('reflect-metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = require('lodash/get');
var setWith = require('lodash/setWith');
var JSON_META_DATA_KEY = 'JsonProperty';

var DecoratorMetaData = function () {
    function DecoratorMetaData(name, clazz) {
        this.name = name;
        this.clazz = clazz;
    }
    return DecoratorMetaData;
}();

function JsonProperty(metadata) {
    var decoratorMetaData = void 0;
    if ((0, _util.isTargetType)(metadata, 'string')) {
        decoratorMetaData = new DecoratorMetaData(metadata);
    } else if ((0, _util.isTargetType)(metadata, 'object')) {
        decoratorMetaData = metadata;
    } else {
        throw new Error('meta data in Json property is undefined. meta data: ' + metadata);
    }
    return (0, _metadata2.default)(JSON_META_DATA_KEY, decoratorMetaData);
}

function getJsonProperty(target, propertyKey) {
    return (0, _getMetadata2.default)(JSON_META_DATA_KEY, target, propertyKey);
}

function mapFromJson(decoratorMetadata, instance, json, key) {
    /**
     * if decorator name is not found, use target property key as decorator name. It means mapping it directly
     */
    var decoratorName = decoratorMetadata.name || key;
    var innerJson = json ? get(json, decoratorName) : instance[key];
    if (innerJson !== undefined && innerJson !== null) {
        if (decoratorMetadata.clazz && innerJson.constructor === Array) {
            var metadata = getJsonProperty(instance, key);
            if (metadata && metadata.clazz) {
                if (innerJson) {
                    return innerJson.map(function (item) {
                        return MapperEntity(metadata.clazz, item);
                    });
                }
                return;
            } else {
                return innerJson;
            }
        }
        if (decoratorMetadata.clazz) {
            if ((typeof innerJson === 'undefined' ? 'undefined' : (0, _typeof3.default)(innerJson)) === 'object') {
                return MapperEntity(decoratorMetadata.clazz, innerJson);
            }
            return MapperEntity(decoratorMetadata.clazz, {});
        }
    }
    var value = get(json, decoratorName);
    if (value === null || value === undefined) {
        value = instance[key];
    }
    return json ? value : undefined;
}

function MapperEntity(Clazz, json) {
    if ((0, _util.hasAnyNullOrUndefined)(Clazz, json)) {
        return void 0;
    }
    /**
     * Prevent non-json continue
     */
    if (!(0, _util.isTargetType)(json, 'object')) {
        return void 0;
    }

    /**
     * init root class to contain json
     */

    var instance = new Clazz();

    (0, _keys2.default)(instance).forEach(function (key) {
        /**
         * get decoratorMetaData, structure: { name?:string, clazz?:{ new():T } }
         */
        var decoratorMetaData = getJsonProperty(instance, key);
        //console.log(decoratorMetaData)
        /**
         * pass value to instance
         */
        if (decoratorMetaData && decoratorMetaData.customConverter && decoratorMetaData.customConverter.fromJson) {
            instance[key] = decoratorMetaData.customConverter.fromJson(json[decoratorMetaData.name || key], json);
        } else {
            var value = json[key];
            if (value === null || value === undefined) {
                value = instance[key];
            }
            instance[key] = decoratorMetaData ? mapFromJson(decoratorMetaData, instance, json, key) : value;
        }
    });

    return instance;
}
/**
 * Serialize: Creates a ready-for-json-serialization object from the provided model instance.
 * Only @JsonProperty decorated properties in the model instance are processed.
 *
 * 反序列化
 * @param instance an instance of a model class
 * @returns {any} an object ready to be serialized to JSON
 */
function serialize(instance) {
    if (!(0, _util.isTargetType)(instance, 'object') || (0, _util.isArrayOrArrayClass)(instance)) {
        return instance;
    }
    var obj = {};
    (0, _keys2.default)(instance).forEach(function (key) {
        var metadata = getJsonProperty(instance, key);
        if (metadata && !metadata.name && metadata.clazz) {
            obj = (0, _assign2.default)(obj, serializeProperty(metadata, instance[key], instance));
        } else {
            var name = metadata && metadata.name ? metadata.name : key;
            obj = setWith(obj, name, serializeProperty(metadata, instance[key], instance));
        }
    });
    return obj;
}
/**
 * Prepare a single property to be serialized to JSON.
 * 
 * @param metadata
 * @param prop
 * @returns {any}
 */
function serializeProperty(metadata, prop, record) {

    if (!metadata || metadata.excludeToJson === true) {
        return;
    }

    if (metadata.customConverter && metadata.customConverter.toJson) {
        return metadata.customConverter.toJson(prop, record);
    }

    if (!metadata.clazz) {
        return prop;
    }

    if ((0, _util.isArrayOrArrayClass)(prop)) {
        return prop.map(function (propItem) {
            return serialize(propItem);
        });
    }

    return serialize(prop);
}
module.exports = {
    MapperEntity: MapperEntity,
    JsonProperty: JsonProperty,
    serialize: serialize
};