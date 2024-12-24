/*
 * @Author: waghao10
 * @Date: 2023-04-14 09:50:21
 * @Description: 
 */
const fabric = require('@umijs/fabric');

module.exports = {
    ...fabric.prettier,
    "singleQuote": true, // 单引号替代双引号
    "semi": false, // 去掉结尾的分号
};