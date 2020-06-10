import {isTargetType,hasAnyNullOrUndefined} from './util';
import 'reflect-metadata';
const get = require('lodash/get')
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
    }
    else if (isTargetType(metadata, 'object')) {
        decoratorMetaData = metadata;
    }
    else {
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
    let innerJson = json ? get(json,decoratorName) : instance[key];
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
        if (decoratorMetadata.clazz&&typeof innerJson==='object') {
            return MapperEntity(decoratorMetadata.clazz, innerJson);
        }
    }
    let value = get(json,decoratorName);
    if(value===null||value===undefined){
        value = instance[key]
    }
    // if(!value&&value!==0){
    //     value =instance[key]
    // }
    return json ? value: undefined;
}
function MapperEntity(Clazz,json) {
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
        let value = json[key]
        if(value===null||value===undefined){
            value = instance[key]
        }
        // if(!value&&value!==0){
        //     value = instance[key]
        // }
        instance[key] = decoratorMetaData ? mapFromJson(decoratorMetaData, instance, json, key) : value;
       // instance[key] = decoratorMetaData ? mapFromJson(decoratorMetaData, instance, json, key) : (json[key]||instance[key]);
    });

    return instance;
}
module.exports={
    MapperEntity,
    JsonProperty
}