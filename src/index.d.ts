import 'reflect-metadata';
/**
 * provide interface to indicate the object is allowed to be traversed
 *
 * @interface
 */
export interface IGenericObject {
    [key: string]: any;
}
/**
 * When custom mapping of a property is required.
 *
 * @interface
 */
export interface ICustomConverter {
        /**
     * 接口数据转成表单数据-序列化
     * @param data 当前属性数据
     * @param record 当前对象
     * @returns 
     */
    fromJson?: (data: any,record?: any) => any;
    /**
     * 表单数据转成接口数据-反序列化
     * @param data 当前属性数据
     * @param record 当前对象
     * @returns 
    */
    toJson?:(data: any,record?:any)=> any;

}
/**
 * IDecoratorMetaData<T>
 * DecoratorConstraint
 *
 * @interface
 * @property {ICustomConverter} customConverter, will be used for mapping the property, if specified
 * @property {boolean} excludeToJson, will exclude the property for serialization, if true
 */
export interface IDecoratorMetaData<T> {
    name?: string;
    clazz?: {
        new (): T;
    };
    customConverter?: ICustomConverter;
    excludeToJson?: boolean;
}
/**
 * JsonProperty
 *
 * @function
 * @property {IDecoratorMetaData<T>|string} metadata, encapsulate it to DecoratorMetaData for standard use
 * @return {(target:Object, targetKey:string | symbol)=> void} decorator function
 */
export declare function JsonProperty<T>(metadata?: IDecoratorMetaData<T> | string): (target: Object, targetKey: string | symbol) => void;
/**
 * MapperEntity
 *
 * @function
 * @param {{new():T}} clazz, class type which is going to initialize and hold a mapping json
 * @param {Object} json, input json object which to be mapped
 *
 * @return {T} return mapped object
 */
export declare function MapperEntity<T extends IGenericObject>(Clazz: {
    new (): T;
}, json: IGenericObject): T;
/**
 * Serialize: Creates a ready-for-json-serialization object from the provided model instance.
 * Only @JsonProperty decorated properties in the model instance are processed.
 *
 * @param instance an instance of a model class
 * @returns {any} an object ready to be serialized to JSON
 */
// export declare function serialize(instance: any): any;

/**
 * Serialize: Creates a ready-for-json-serialization object from the provided model instance.
 * Only @JsonProperty decorated properties in the model instance are processed.
 *
 * @param instance an instance of a model class
 * @returns {any} an object ready to be serialized to JSON
 */
 export declare function serialize(instance: any): any;