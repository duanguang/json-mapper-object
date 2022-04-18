import { MapperEntity, serialize, JsonProperty } from '../src/json-mapper';
const data = require('./data.json')
class BaseModel {
    /** *操作结果 
     * @type {boolean}
     */
    success = true;

    /**
     * 描述信息
     *
     * @type {string}
     */
    message = '';

    /**  提示信息编码
     * @type {(string|number)}
     */
    code= '';

    /**  返回数据信息
     * @type {T}
     */
    data= null;
    transformArray(rows,mapEntity) {
        return (rows || []).map(row => {
            return this.transformRow(row,mapEntity);
        });
    }
    transformRows(rows,mapEntity) {
        return (rows || []).map(row => {
            return this.transformRow(row,mapEntity);
        });
    }
    transformRow(row,mapEntity) {
        return MapperEntity(mapEntity,row);
    }
}
class MenuBaseModel {
    @JsonProperty('key')
    key = '';

    @JsonProperty('title')
    title = '';

    @JsonProperty('content')
    content = '';

    @JsonProperty('path')
    path= '';

    @JsonProperty('closable')
     closable= false;

    @JsonProperty({ clazz: MenuBaseModel,name: 'child' })
     children  = [];

    @JsonProperty('deep')
     deep = [];

    @JsonProperty('iconurl')
    icon = '';

    loadingMode = 'iframe';
    router = 'history';
    sandbox = {
        appName: '',
        appEntiy: '',
        appRootId: '',
        experimentalStyleIsolation: true,
        isMerge: false,
    };
}
class MenuModel extends BaseModel {
    constructor() {
        super();
    }
}
describe('json-mapper', () => {
  it('simple json object #1', () => {
    const _res = new MenuModel()
    _res.code = ''
    try {
      _res.data = _res.transformRows(data.data,MenuBaseModel)
      _res.success = true
        _res.message = '成功'
    }
    catch (ex) {
      console.log(ex)
    }
  });
});
