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
      const res = await db.collection('user').add({
        data: {
          ...event.data,
          _openid: wxContext.OPENID
        }
      })
      return response.success(res)
    }
    if (action == 'update') {
      console.log(event._id);
      const res = await db.collection('user').doc(event._id).update({
        data: event.data
      })
      return response.success(res)
    }
    if (action == 'info') {
      const res = await db.collection('user').doc(event._id).get()
      return response.success(res)
    }
    if (action == 'getByOpenId') {
      const res = await db.collection('user').aggregate()
        .match({
          _openid: wxContext.OPENID
        })
        .end()
        console.log(res);
      return response.success(res)
    }
  } catch (error) {
    return response.fail(JSON.stringify(error))
  }
  // return {
  //   rep: rep.success("666"),
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}