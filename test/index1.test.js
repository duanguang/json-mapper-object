/*
 * @Author: duanguang
 * @Date: 2022-03-10 11:42:25
 * @LastEditTime: 2022-04-18 15:50:50
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /json-mapper-object/test/index1.test.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import expect from 'expect';
import { Math, Address, Person, Student, Address1, Select } from './Math';
import { MapperEntity, serialize, JsonProperty } from '../lib/json-mapper';
const get = require('lodash/get');
const setWith = require('lodash/setWith');
const data = require('./test.json')
class BaseEntity {

  success = true;
  message = '';
  code = '';
  result = null;
  data = null;
  transformArray(rows, mapEntity) {
    return (rows || []).map(row => {
      return this.transformRow(row, mapEntity);
    });
  }
  transformRows(rows, mapEntity) {
    return (rows || []).map(row => {
      return this.transformRow(row, mapEntity);
    });
  }
  transformRow(row, mapEntity) {
    return MapperEntity(mapEntity, row);
  }
}
class MenuListEntity {
  @JsonProperty('meta.title')
  title = '';
  @JsonProperty('meta.icon')
  icon = '';
  @JsonProperty('path')
  path = '';
  @JsonProperty('menuId')
  menuId = '';
  get key() {
    return this.menuId?this.menuId.toString():void 0;
  }
  @JsonProperty({ clazz: MenuListEntity, name: 'children' })
  children = [];
  @JsonProperty('deep')
  deep = [];
  loadingMode = 'iframe';
}
 class MenuListContainerEntity extends BaseEntity {
  constructor(fromService) {
    super();
    this.code = fromService.code;
    this.message = fromService.msg;
    this.success = fromService.code === 200;
    this.data = super.transformArray(fromService.data, MenuListEntity);
  }
}
describe('json-mapper', () => {
  it('simple json object #1', () => {
    const person = new MenuListContainerEntity(data);
  });
});
