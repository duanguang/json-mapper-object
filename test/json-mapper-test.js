import expect from 'expect';
import {Math,Address} from "./Math";
import {MapperEntity} from '../src/json-mapper'


describe('json-mapper', () => {
    it('simple json object #1', () => {
        let json = {
            "Name": "Mark",
            "xing": "Galea",
            "age": 30,
            "AddressArr": null,
            "Address": null
        };
        const person = MapperEntity(Math, json);
        console.log(person)
        expect(person.address).toEqual(void 0);
        expect(person.name).toEqual("Mark");
        expect(person.surname).toEqual("Galea");
        expect(person.addressArr).toEqual([]);
        expect(person.Address).toEqual(null);
    });

    // it('simple json object #2', function () {
    //     let addressjson = {
    //         "first-line": "Some where",
    //         "second-line": "Over Here",
    //         "city": "In This City",
    //         "student": [{
    //             name: "Ailun"
    //         },{
    //             name: "Ailun"
    //         }]

    //     };
    //     const address = MapperEntity(Address, addressjson);
    //     const student=typeof address.student;
    //     expect(address.firstLine).toEqual("Some where");
    //     expect(address.secondLine).toEqual("Over Here");
    //     expect(address.city).toEqual("In This City");
    //     expect(student).toEqual('object');
    //     expect(address.student[0].fullName).toEqual('Ailun');

    // });

    // it('complex json object #1', function () {
    //     let json = {
    //         "Name": "Mark",
    //         "xing": "Galea",
    //         "age": 30,
    //         "AddressArr": [
    //             {
    //                 "first-line": "Some where",
    //                 "second-line": "Over Here",
    //                 "city": "In This City",
    //                 "student": {
    //                     name: "Ailun"
    //                 }
    //             },
    //             {
    //                 "first-line": "Some where",
    //                 "second-line": "Over Here",
    //                 "city": "In This City",
    //                 "student": [{
    //                     name: "Ailun"
    //                 },{name:'11'}]
    //             }
    //         ],
    //         "Address": {
    //             "first-line": "Some where",
    //             "second-line": "Over Here",
    //             "city": "In This City",
    //             "student": {
    //                 name: "Ailun"
    //             }
    //         }
    //     };

    //     const person = MapperEntity(Math, json);
    //     //expect(person.address).toBe(new Address());
    //     expect(person.age).toBeA('number');
    //     expect(person.name).toBeA('string');
    //     expect(person.address).toBeA('object');
    //     expect(person.addressArr.length).toEqual(2);
    //     expect(person.address.student.fullName).toEqual('Ailun');

    // });

    // it('empty json object #1', function () {
    //     let json = {};
    //     const person = MapperEntity(Math, json);
    //     expect(person.address).toEqual(void 0);
    //     expect(person.name).toEqual(void 0);
    //     expect(person.surname).toEqual(void 0);
    //     expect(person.AddressArr).toEqual(void 0);
    // });

    // it('empty json object #2', function () {
    //     let json = null;
    //     const person = MapperEntity(Math, json);
    //     expect(person).toEqual(void 0);
    // });

    // it('empty json object #3', function () {
    //     let json = void 0;
    //     const person = MapperEntity(Math, json);
    //     expect(person).toEqual(void 0);
    // });

    // it('invalid primitive value #1', function () {
    //     let json = 123;
    //     const person = MapperEntity(Math, json);
    //     expect(person).toEqual(void 0);
    // });

    // it('invalid primitive value #2', function () {
    //     let json = '';
    //     const person = MapperEntity(Math, json);
    //     expect(person).toEqual(void 0);
    // });

    // it('invalid primitive value #3', function () {
    //     let json = NaN;
    //     const person = MapperEntity(Math, json);
    //     expect(person).toEqual(void 0);
    // });

    // it('invalid json object #1', function () {
    //     let json = {
    //         "NameTest": "Mark",
    //     };
    //     const person = MapperEntity(Math, json);
    //     expect(person.name).toEqual(void 0);
    // });
});
