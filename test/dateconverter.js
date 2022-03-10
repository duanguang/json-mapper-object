/*
 * @Author: duanguang
 * @Date: 2022-03-10 13:56:48
 * @LastEditTime: 2022-03-10 14:25:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /json-mapper-object/test/dateconverter.js
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
export const dateConverter = {
    fromJson(data,json) {
        //console.log(json)
        return new Date(data);
    },

    toJson(data) {
        return 'some-date';
    }
};