// 云函数入口文件
const cloud = require('wx-server-sdk');
const dayjs = require('dayjs');
const response = require('./response');
const {
  json
} = require('stream/consumers');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
const startMessage = '月经开始啦'
const endMessage = '月经结束啦'
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const {
      data: sys
    } = await db.collection('system').orderBy('created', 'desc').limit(1).get()
    const sysObj = sys[0]
    const today = dayjs().get('D')
    const startDate = sysObj.menstrual
    const endDate = dayjs(`${dayjs().format('YYYY-MM')}-${startDate}`).add(7, 'day').get('D')
    if (!startDate) return response.success('日期未到')
    const isEnd = endDate == today
    const isStart = startDate == today
    if (isEnd || isStart) {
      const {
        data: users
      } = await db.collection('user').get()
      console.log(users);
      const girl = users.find(f => f.sex == 'FEMALE') || {}
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        console.log(user._openid);
        await cloud.openapi.subscribeMessage.send({
          touser: user._openid, // 要推送的用户openid
          templateId: "K322gM1NrIq6hQm2dTQHCAJfaC0tq-WBAuOawhtayYA", // 模板ID
          data: {
            thing1: {
              value: `${girl.nickname}的月经提醒`
            },
            time2: {
              value: dayjs().format('YYYY-MM-DD')
            },
            thing4: {
              value: isStart ? startMessage : endMessage
            }
          }, //模板数据填充部分
          miniprogramState: 'developer' //小程序类型，默认为正式版，这里设置为开发者模式
        });
      }
      return response.success('发送成功')
    }
  } catch (error) {
    return response.success(error)
  }
}