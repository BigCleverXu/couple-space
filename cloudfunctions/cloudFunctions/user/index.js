// 云函数入口文件
const response = require('../response')
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const action = event.action
  try {
    if (action == 'create') {
      console.log(event.data);
      const res = await db.collection('user').add({
        data: event.data
      })
      return response.success(res)
    }
    if (action == 'info') {
      console.log(event.data);
      const res = await db.collection('user').doc(event.data.id).get()
      return response.success(res)
    }
  } catch (error) {
    return response.fail(error.message)
  }
  // return {
  //   rep: rep.success("666"),
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}