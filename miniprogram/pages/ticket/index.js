// pages/ticket/index.js
import Toast from 'tdesign-miniprogram/toast/index';
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
  toScan() {
    const that = this
    wx.scanCode({
      onlyFromCamera: true,
    }).then(res => {
      Toast({
        context: that,
        selector: '#t-toast',
        message: '扫码成功',
      });
      console.log(res.result)
    })
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
        hasUser: openId
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