// 云函数入口文件
const cloud = require('wx-server-sdk')
const user = require('./user/index');
const getOpenId = require('./getOpenId/index')
const system = require('./system/index')
const anniversary = require('./anniversary/index')
const dayil = require('./dayil/index')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  switch (event.type) {
    case 'user':
      return await user.main(event, context);
    case 'system':
      return await system.main(event, context);
    case 'anniversary':
      return await anniversary.main(event, context);
    case 'dayil':
      return await dayil.main(event, context);
    case 'openId':
      return await getOpenId.main(event, context);
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}