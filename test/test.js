import {decorate,isTargetType} from './util';

var DecoratorMetaData = (function () {
    function DecoratorMetaData(name, clazz) {
        this.name = name;
        this.clazz = clazz;
    }
    return DecoratorMetaData;
}());

function hasAnyNullOrUndefined(...args) {
    return args.some((arg) =>{return arg === null || arg === undefined});
}

function handleDescriptor(target, property, descriptor,name) {

    return function (target, property, descriptor) {
        console.log(name);
        descriptor.writable = false;
        return descriptor;
    }

}


export function JsonProperty(args) {
    var decoratorMetaData;
    if (isTargetType(args, 'string')) {
        decoratorMetaData = new DecoratorMetaData(args);
    }
    else if (isTargetType(args, 'object')) {
        decoratorMetaData = args;
    }
    else {
        throw new Error('index.ts: meta data in Json property is undefined. meta data: ' + metadata)
    }

    return decorate(handleDescriptor, decoratorMetaData);

}

export function deserialize(Clazz,json) {
    //console.log(hasAnyNullOrUndefined(Clazz, json));
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
        console.log(instance[key]);
        //let decoratorMetaData = getJsonProperty(instance, key);

        /**
         * pass value to instance
         */
        // instance[key] = decoratorMetaData ? mapFromJson(decoratorMetaData, instance, json, key) : json[key];
    });

    return instance;
}
/*function JsonProperty(name) {
 return(target, property, desc)=>{
 console.log(desc);
 }
 }*/
