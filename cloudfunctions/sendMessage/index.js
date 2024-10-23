// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const sendmsg = await cloud.openapi.subscribeMessage.send({
    touser: "o5NtF5U-ECnCeOP060nkImYHl-fM", // 要推送的用户openid
    templateId: "K322gM1NrIq6hQm2dTQHCE9BBDWn-jSO7IlS6-tgBxg", // 模板ID
    data: {
      time2: {
        value: "2024-12-31"
      },
      thing3: {
        value: "地点"
      },
      thing4: {
        value: "备注"
      },
      thing1: {
        value: "日程"
      }
    }, //模板数据填充部分
    miniprogramState: 'developer' //小程序类型，默认为正式版，这里设置为开发者模式
  });
  return sendmsg; // 返回执行结果
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}