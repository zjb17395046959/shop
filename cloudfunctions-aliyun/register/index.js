'use strict';
// 云函数代码,注册目前没搞懂，我曹了
const uniID = require('uni-id')
exports.main = async function(event,context) {
    const {
        username,
        password
    } = event
    // username、password验证是否合法的逻辑
    const res = await uniID.register({
        username,
        password
    })
    return res
}
