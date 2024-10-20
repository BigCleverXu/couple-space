// app.js
import {
  getUserByOpenId,
  urlToObj
} from './utils/index'
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'love-5gwx8a4pd67d3c1a',
        traceUser: true,
      });
      this.getOpenId()
      this.getSysInfo()
      this.getUserList()
    }
    this.globalData = {};
  },
  getOpenId() {
    const openId = wx.getStorageSync('openId') || false
    if (!openId) {
      wx.cloud.callFunction({
        name: "cloudFunctions",
        data: {
          type: "openId"
        }
      }).then(({
        result
      }) => {
        if (result.success) {
          wx.setStorageSync('openId', result.data.openId)
        }
      })
    }

  },
  getUserList() {
    wx.cloud.callFunction({
      name: "cloudFunctions",
      data: {
        type: "user",
        action: "all"
      }
    }).then(({
      result
    }) => {
      if (result.success) {
        const userList = result.data.data
        wx.setStorageSync('userList', userList)
        const userInfo = getUserByOpenId(result.data.data, wx.getStorageSync('openId'))
        wx.setStorageSync('userInfo', userInfo)
      }
    })
  },
  getSysInfo() {
    wx.cloud.callFunction({
      name: "cloudFunctions",
      data: {
        type: "system",
        action: "getOne"
      }
    }).then(({
      result
    }) => {
      if (result.success) {
        console.log(result.data);
        const sysInfo = result.data.data[0]
        if (result.data.data.length) {
          sysInfo.banner = urlToObj(result.data.data[0].banner)
        }
        wx.setStorageSync('sysInfo', sysInfo)
      }
    })
  }
});