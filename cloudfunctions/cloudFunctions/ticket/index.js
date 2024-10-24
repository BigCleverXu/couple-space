// 云函数入口文件
const response = require('../response')
const cloud = require('wx-server-sdk')
const dayjs = require('dayjs')
const _ = require('lodash')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const action = event.action
  try {
    if (action == 'list') {
      const query = event.data || {}
      console.log(query, 'query');
      let res = await db.collection('ticket').where(query).get()
      const _res = _.cloneDeep(res)
      _res.data.forEach(item => {
        item.createText = dayjs(item.createdAt).format('YYYY-MM-DD')
      })
      return response.success(_res)
    }
    if (action == 'create') {
      const res = await db.collection('ticket').add({
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
      const res = await db.collection('ticket').doc(event._id).update({
        data: {
          ...event.data,
          updatedAt: new Date().getTime()
        }
      })
      return response.success(res)
    }
    if (action == 'info') {
      const res = await db.collection('ticket').doc(event._id).get()
      return response.success(res)
    }
  } catch (error) {
    return response.fail(JSON.stringify(error))
  }
}