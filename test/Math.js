import {JsonProperty} from '../src/json-mapper';


export class Student {
    @JsonProperty('name')
    fullName=void 0;

    constructor() {
    }
}
export class Address {
    @JsonProperty('first-line')
    firstLine=void 0;
    @JsonProperty('second-line')
    secondLine=void 0;
    @JsonProperty({clazz: Student})
    student=void 0;
    city=void 0;

    constructor() {
    }
}

export class Math {
    @JsonProperty('Name')
    name=void 0;

    age=void 0;

    @JsonProperty('xing')
    surname=void 0;

    age=void 0;

    @JsonProperty({clazz: Address, name: 'AddressArr'})
    addressArr=void 0;

    @JsonProperty({clazz: Address, name: 'Address'})
    address=void 0;

    constructor() {
    }
}