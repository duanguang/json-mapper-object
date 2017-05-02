#json-mapper-object

##介绍(Introduction)
声明: 基于朋友的json-typescript-mapper库改动而来，因朋友的这个数据转换库是基于typescript编写（下面简称ts），里面部分逻辑依据ts编译
的JS来写的，在使用过程中有诸多不便，所以稍微改动了一些地方。

背景：对于单页应用，数据源是从API服务器获得的。 我们不用直接使用api数据。这时就需要适配器层赖根据需要转换数据。
     此外，该适配器与API服务器的数据依赖关系相反（API Server被视为不可控制的非常不可靠，因为数据结构可能由后端
     编码器为某些特定目的编辑）到我们的适配器这变得可靠。 因此，该库被创建为适配器。

### Get Started

### using
npm install json-typescript-object --save
or
yarn add json-typescript-object

###Example
import {MapperEntity,JsonProperty} from 'json-mapper-object';

class Student {
    @JsonProperty('name')
    fullName=void 0;

    constructor() {
    }
}

class Address {
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

class Person {
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

现在这里是API服务器返回的数据，假设它已经被解析为JSON对象。

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
              name: "Ailun"
          }
      }
  ],
  "Address": {
      "first-line": "Some where",
      "second-line": "Over Here",
      "city": "In This City",
      "student": {
          name: "Ailun"
      }
  }

  只需使用以下代码即可映射。 该映射基于@JsonProperty装饰器元数据。

  const person = MapperEntity(Person, json);