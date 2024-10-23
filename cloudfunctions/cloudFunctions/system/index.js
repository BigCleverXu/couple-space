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
      const res = await db.collection('system').add({
        data: {
          ...event.data,
          createdAt: new Date().getTime(),
          _openid: wxContext.OPENID
        }
      })
      return response.success(res)
    }
    if (action == 'update') {
      console.log(event._id);
      const res = await db.collection('system').doc(event._id).update({
        data: {
          ...event.data,
          updatedAt: new Date().getTime()
        }
      })
      return response.success(res)
    }
    if (action == 'info') {
      const res = await db.collection('system').doc(event._id).get()
      return response.success(res)
    }
    if (action == 'getOne') {
      const res = await db.collection('system').orderBy('createdAt', 'desc').limit(1).get()
      return response.success(res)
    }
  } catch (error) {
    return response.fail(JSON.stringify(error))
  }
}