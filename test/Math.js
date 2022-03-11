/*
 * @Author: duanguang
 * @Date: 2019-02-28 11:38:47
 * @LastEditTime: 2022-03-11 10:38:07
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /json-mapper-object/test/Math.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import {JsonProperty} from '../src/json-mapper';
import {dateConverter} from './dateconverter'
export class Student {
    @JsonProperty('name')
    fullName=void 0;

    @JsonProperty({name: 'dob', customConverter: dateConverter})
    dateOfBirth = undefined;
}
class SelectLabelInValue {
    @JsonProperty('name')
    key=void 0;

    @JsonProperty('dob')
    label = undefined;
}
export class Select{
    @JsonProperty({clazz: SelectLabelInValue})
    select = void 0;
    
    @JsonProperty({name:'multiple',clazz: SelectLabelInValue})
    select_multiple =void 0
}
export class Address {
    @JsonProperty('first-line')
    firstLine=void 0;
    @JsonProperty('second-line')
    secondLine=void 0;
    @JsonProperty({clazz: Student})
    student = void 0;

   
    
    @JsonProperty({name:'student_1',clazz: Student})
    students=void 0;
    @JsonProperty({name:'student_2',clazz: Student})
    student2=void 0;
    city=void 0;
}
export class Address1 {
    @JsonProperty('first-line')
    firstLine=void 0;
    @JsonProperty('second-line')
    secondLine=void 0;
    @JsonProperty({name:'test',clazz: Student})
    student = void 0;
    
    @JsonProperty({name:'student_1.student_2',clazz: Student})
    students = void 0;
    @JsonProperty({name:'student_1.student_3',clazz: Student})
    student3=void 0;
    city=void 0;
}
export class Person {
    @JsonProperty('Name')
    name=void 0;

    age=void 0;

    @JsonProperty('xing')
    surname = void 0;
    
    @JsonProperty('Area')
    area = '广州';
    
    @JsonProperty('Area1')
    area1 = '广州';
    
    @JsonProperty('Area2')
    area2='广州';
   
    @JsonProperty({clazz: Address, name: 'AddressArr'})
    addressArr=void 0;

    @JsonProperty({clazz: Address, name: 'Address'})
    address=void 0;

    constructor() {
    }
}
export class Math {
    @JsonProperty('Name')
    name=void 0;

    @JsonProperty('age')
    age=void 0;

    @JsonProperty('xing')
    surname=void 0;


    @JsonProperty({clazz: Address, name: 'AddressArr'})
    addressArr=void 0;

    @JsonProperty({clazz: Address, name: 'Address'})
    address=void 0;

    constructor() {
    }
}