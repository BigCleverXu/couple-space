// pages/ticket/index.js
import Toast, {
  hideToast
} from 'tdesign-miniprogram/toast/index';
import Message from 'tdesign-miniprogram/message/index';
import {
  to
} from '../../utils/index'
import {
  Request
} from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultTab: '0',
    list: []
  },
  toAdd() {
    to('/pages/ticket/ticket-form/index')
  },
  checkOut(ticketId) {
    return new Promise((resolve) => {
      Toast({
        context: this,
        theme: 'loading',
        selector: '#t-toast',
        direction: 'column',
        message: '正在验票',
      });
      wx.cloud.callFunction({
        name: "cloudFunctions",
        data: {
          type: "ticket",
          action: "check",
          data: {
            _id: ticketId
          }
        }
      }).then(({
        result
      }) => {
        hideToast()
        if (!result.success) {
          Message.error({
            context: this,
            offset: [90, 32],
            duration: 3000,
            content: result.data,
          });
          resolve(false)
        } else {
          Message.success({
            context: this,
            offset: [90, 32],
            duration: 3000,
            content: "验票成功",
          });
          resolve(true)
        }
      })
    })

  },
  async toScan() {
    const res = await wx.scanCode({
      onlyFromCamera: true,
    })
    await this.checkOut(res.result)
    this.getTicketsList()
  },
  onTabsChange(event) {
    this.setData({
      defaultTab: event.detail.value
    })
    this.getTicketsList()
  },
  async getTicketsList() {
    if (this.data.defaultTab == '0') {
      const openId = wx.getStorageSync('openId')
      const request = new Request()
      const res = await request.list('ticket', {
        hasUser: openId,
        self: true
      })
      this.setData({
        list: res.data
      })
    }
    if (this.data.defaultTab == '1') {
      const openId = wx.getStorageSync('openId')
      const request = new Request()
      const res = await request.list('ticket', {
        _openid: openId
      })
      this.setData({
        list: res.data
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTicketsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})