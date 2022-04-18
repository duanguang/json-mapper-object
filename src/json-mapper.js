import {
    isTargetType,
    hasAnyNullOrUndefined,
    isArrayOrArrayClass
} from './util';
import 'reflect-metadata';
const get = require('lodash/get')
const setWith = require('lodash/setWith')
const JSON_META_DATA_KEY = 'JsonProperty';

var DecoratorMetaData = (function () {
    function DecoratorMetaData(name, clazz) {
        this.name = name;
        this.clazz = clazz;
    }
    return DecoratorMetaData;
}());


function JsonProperty(metadata) {
    let decoratorMetaData;
    if (isTargetType(metadata, 'string')) {
        decoratorMetaData = new DecoratorMetaData(metadata);
    } else if (isTargetType(metadata, 'object')) {
        decoratorMetaData = metadata;
    } else {
        throw new Error('meta data in Json property is undefined. meta data: ' + metadata);
    }
    return Reflect.metadata(JSON_META_DATA_KEY, decoratorMetaData);
}


function getJsonProperty(target, propertyKey) {
    return Reflect.getMetadata(JSON_META_DATA_KEY, target, propertyKey);

}

function mapFromJson(decoratorMetadata, instance, json, key) {
    /**
     * if decorator name is not found, use target property key as decorator name. It means mapping it directly
     */
    let decoratorName = decoratorMetadata.name || key;
    let innerJson = json ? get(json, decoratorName) : instance[key];
    if (innerJson !== undefined && innerJson !== null) {
        if (decoratorMetadata.clazz && innerJson.constructor === Array) {
            let metadata = getJsonProperty(instance, key);
            if (metadata && metadata.clazz) {
                if (innerJson) {
                    return innerJson.map(
                        (item) => MapperEntity(metadata.clazz, item)
                    );
                }
                return;
            } else {
                return innerJson;
            }
        }
        if (decoratorMetadata.clazz) {
            if (typeof innerJson === 'object') {
                return MapperEntity(decoratorMetadata.clazz, innerJson);
            }
            return MapperEntity(decoratorMetadata.clazz, {});
        }
    }
    let value = get(json, decoratorName);
    if (value === null || value === undefined) {
        value = instance[key]

    }
    return json ? value : undefined;
}

function MapperEntity(Clazz, json) {
    if (hasAnyNullOrUndefined(Clazz, json)) {
        return void 0;
    }
    /**
     * Prevent non-json continue
     */
    if (!isTargetType(json, 'object')) {
        return void 0;
    }

    /**
     * init root class to contain json
     */

    let instance = new Clazz();

    Object.keys(instance).forEach((key) => {
        /**
         * get decoratorMetaData, structure: { name?:string, clazz?:{ new():T } }
         */
        let decoratorMetaData = getJsonProperty(instance, key);
        //console.log(decoratorMetaData)
        /**
         * pass value to instance
         */
        if (decoratorMetaData && decoratorMetaData.customConverter && decoratorMetaData.customConverter.fromJson) {
            instance[key] = decoratorMetaData.customConverter.fromJson(json[decoratorMetaData.name || key], json);
        } else {
            let value = json[key]
            if (value === null || value === undefined) {
                value = instance[key]
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
    if (!isTargetType(instance, 'object') || isArrayOrArrayClass(instance)) {
        return instance;
    }
    let obj = {};
    Object.keys(instance).forEach(key => {
        const metadata = getJsonProperty(instance, key);
        if (metadata && !metadata.name && metadata.clazz) {
            obj = Object.assign(obj,serializeProperty(metadata, instance[key]))
        } else {
            const name = metadata && metadata.name ? metadata.name : key
            obj = setWith(obj, name, serializeProperty(metadata, instance[key]))
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
function serializeProperty(metadata, prop) {

    if (!metadata || metadata.excludeToJson === true) {
        return;
    }

    if (metadata.customConverter && metadata.customConverter.toJson) {
        return metadata.customConverter.toJson(prop);
    }

    if (!metadata.clazz) {
        return prop;
    }

    if (isArrayOrArrayClass(prop)) {
        return prop.map((propItem) => serialize(propItem));
    }

    return serialize(prop);
}
module.exports = {
    MapperEntity,
    JsonProperty,
    serialize
}