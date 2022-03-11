/*
 * @Author: duanguang
 * @Date: 2022-03-10 11:42:25
 * @LastEditTime: 2022-03-11 10:52:50
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /json-mapper-object/test/index.test.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import expect from 'expect';
import {
    Math,
    Address,
    Person,
    Student,
    Address1,
    Select
} from "./Math";
import {
    MapperEntity,
    serialize,
    JsonProperty
} from '../src/json-mapper'
const get = require('lodash/get')
const setWith = require('lodash/setWith')
import {dateConverter} from './dateconverter'
describe('json-mapper', () => {
    it('simple json object #1', () => {
        let json = {
            "Name": "Mark",
            "xing": "Galea",
            "age": 30,
            "AddressArr": null,
            "Address": null,
            "Area": null,
            "Area1": void 0,
            "Area2":''
        };
        const person = MapperEntity(Person,json);
        expect(person.address).toBeA(Address);
        expect(person.name).toEqual("Mark");
        expect(person.surname).toEqual("Galea");
        expect(person.addressArr).toBeA(Address);
        expect(person.area).toEqual('广州');
        expect(person.area1).toEqual('广州');
        expect(person.area2).toEqual('');
    });
    it('simple json object #2', function () {
        let addressjson = {
            "first-line": "Some where",
            "second-line": "Over Here",
            "city": "In This City",
            "student": {
                name: "Ailun"
            }
        };
        const address = MapperEntity(Address, addressjson);
        expect(address.firstLine).toEqual("Some where");
        expect(address.secondLine).toEqual("Over Here");
        expect(address.city).toEqual("In This City");
        expect(address.student).toBeAn('object');
        expect(address.student.fullName).toEqual('Ailun');
    });
    it('complex json object #1', function () {
        let json = {
            "Name": "Mark",
            "xing": "Galea",
            "age": 30,
            "AddressArr": [
                {
                    "first-line": "Some where",
                    "second-line": "Over Here",
                    "city": "In This City",
                    "student": {
                        name1: "Ailun"
                    }
                },
                {
                    "first-line": "Some where",
                    "second-line": "Over Here",
                    "city": "In This City",
                    "student": {
                        name1: "Ailun"
                    }
                }
            ],
            "Address": {
                "first-line": "Some where",
                "second-line": "Over Here",
                "city": "In This City",
                "student": {
                    name: "xiaohong"
                }
            }
        };
        const person = MapperEntity(Person,json);
        expect(person.address).toBeA(Address);
        expect(person.age).toBeA('number');
        expect(person.name).toBeA('string');
        expect(person.address).toBeAn('object');
        expect(person.addressArr.length).toEqual(2);
        expect(person.address.student.fullName).toEqual('xiaohong');
    });
    it('empty json object #1', function () {
        let json = {};
        const person = MapperEntity(Person, json);
        expect(person.address).toBeA(Address);
        expect(person.name).toEqual(void 0);
        expect(person.surname).toEqual(void 0);
        expect(person.addressArr).toBeA(Address);
    });
    it('empty json object #2', function () {
        let json = null;
        const person = MapperEntity(Person, json);
        expect(person).toEqual(void 0);
    });

    it('empty json object #3', function () {
        let json = void 0;
        const person = MapperEntity(Person, json);
        expect(person).toEqual(void 0);
    });

    it('invalid primitive value #1', function () {
        let json = 123;
        const person = MapperEntity(Person, json);
        expect(person).toEqual(void 0);
    });

    it('invalid primitive value #2', function () {
        let json = '';
        const person = MapperEntity(Person, json);
        expect(person).toEqual(void 0);
    });
    it('invalid primitive value #3', function () {
        let json = NaN;
        const person = MapperEntity(Person, json);
        expect(person).toEqual(void 0);
    });

    it('invalid json object #1', function () {
        let json = {
            "NameTest": "Mark",
        };
        const person = MapperEntity(Person, json);
        expect(person.name).toEqual(void 0);
    });
    it('should use a custom converter if available #1', function () {
        const json = {
            "name": "John Doe",
            dob: "1995-11-10"
        };
        const student = MapperEntity(Student, json);
        expect(student.fullName).toEqual('John Doe');
        expect(student.dateOfBirth).toBeA(Date);
        expect(student.dateOfBirth.toString()).toEqual(new Date("1995-11-10").toString());
    });
    it('should use a custom converter if available #2', function () {
        const json = {
            'student_1': {
                "name": "John Doe",
                dob: "1995-11-10"
            },
            firstLine:'1111'
        };
        const address = MapperEntity(Address,json);
        expect(address.student.fullName).toEqual(void 0);
        expect(address.student.dateOfBirth).toEqual('Invalid Date');
        expect(address.students.fullName).toEqual('John Doe');
        expect(address.students.dateOfBirth).toBeA(Date);
        expect(address.students.dateOfBirth.toString()).toEqual(new Date("1995-11-10").toString());
    });
    it('should use a custom converter if available #3', function () {
        const json = {
            "name": "John Doe",
            dob: "1995-11-10",
            'student_1': {
                "name": "John Doe1",
                dob: "1995-12-10"
            },
            'student_2': '',
            'first-line': '1111'
        };
        const address = MapperEntity(Address,json);
        expect(address.student.fullName).toEqual('John Doe');
        expect(address.student2).toBeA(Student);
        expect(address.student.dateOfBirth).toBeA(Date);
        expect(address.student.dateOfBirth.toString()).toEqual(new Date("1995-11-10").toString());
        expect(address.students.fullName).toEqual('John Doe1');
        expect(address.students.dateOfBirth).toBeA(Date);
        expect(address.students.dateOfBirth.toString()).toEqual(new Date("1995-12-10").toString());
    });
    it('Get the specified field data #1',function () {
        const json = {
            test: {
                "name": "John Doe",
                dob: "1995-11-10",
            },
            'student_1': {
                'student_2':{
                    "name": "John Doe1",
                    dob: "1995-12-10"
                },
            },
            'first-line': '1111'
        };
        const address = MapperEntity(Address1,json);
        expect(address.student.fullName).toEqual('John Doe');
        expect(address.student.dateOfBirth).toBeA(Date);
        expect(address.student.dateOfBirth.toString()).toEqual(new Date("1995-11-10").toString());
        expect(address.students.fullName).toEqual('John Doe1');
        expect(address.students.dateOfBirth).toBeA(Date);
        expect(address.students.dateOfBirth.toString()).toEqual(new Date("1995-12-10").toString());
    })
});

describe('serialize', () => {
    it('should use the property name given in the meta data#1', function () {
        class ClassWithPrimitiveProp {
            @JsonProperty('theName')
            name = undefined;
        }
        const instance = new ClassWithPrimitiveProp();
        instance.name = 'Jim';
        const serializedInstance = serialize(instance);
        expect(serializedInstance.theName).toEqual('Jim');
    });
    it('should use the property name given in the meta data#2', function () {
        const json = {
            test: {
                "name": "John Doe",
                dob: "1995-11-10",
            },
            'student_1': {
                'student_2':{
                    "name": "John Doe1",
                    dob: "1995-12-10"
                },
                'student_3':{
                    "name": "John Doe3",
                    dob: "1995-10-10"
                },
            },
            'first-line': '1111'
        };
        const address = MapperEntity(Address1,json);
        const serializedInstance = serialize(address);
        const student_2_name = get(serializedInstance,'student_1.student_2.name')
        const student_3_name = get(serializedInstance,'student_1.student_3.name')
        const test_name = get(serializedInstance,'test.name')
        expect(serializedInstance['first-line']).toEqual('1111');
        expect(test_name).toEqual('John Doe');
        expect(student_2_name).toEqual('John Doe1');
        expect(student_3_name).toEqual('John Doe3');
    });
    it('should use the property name given in the meta data#3', function () {
        const json = {
            "name": "John Doe",
            dob: "1995-11-10",
            'multiple': [{
                "name": "John Doe1",
                dob: "1995-12-10"
            }],
        };
        let selects = MapperEntity(Select,json);
        selects.select.title =''
        const serializedInstance = serialize(selects);
        expect(serializedInstance.multiple).toBeA(Array);
        expect(serializedInstance.name).toEqual('John Doe');
    });
    it('should apply serialize for all array items if clazz is specified', function () {
        const json = {
            test: {
                "name": "John Doe",
                dob: "1995-11-10",
            },
            'student_1': {
                'student_2':{
                    "name": "John Doe1",
                    dob: "1995-12-10"
                },
                'student_3':[{
                    "name": "John Doe3",
                    dob: "1995-10-10"
                }],
            },
            'first-line': '1111'
        };
        const address = MapperEntity(Address1,json);
        const serializedInstance = serialize(address);
        const student3 = get(serializedInstance,'student_1.student_3')
         expect(student3).toBeA(Array);
         expect(student3.length).toEqual(1);
         expect(student3[0].dob).toEqual('some-date');
         expect(student3[0].name).toEqual('John Doe3');
    });
});