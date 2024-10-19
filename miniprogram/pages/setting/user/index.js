// pages/setting/user/index.js
const app = getApp()
import {
  Request
} from '../../../utils/request'
import {
  uploadImgs
} from '../.././../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      avatar: "",
      nickname: "",
      direction: 'LEFT',
      sex: "MALE"
    }
  },
  async submit() {
    const http = new Request(this)
    const formData = this.data.formData
    let res;
    let userInfo;
    if (formData._id) {
      res = await http.update("user", formData)
      userInfo = this.data.formData
    } else {
      res = await http.create("user", formData)
      userInfo = await http.info("user", res._id)
      this.setData({
        formData: userInfo.data
      })
    }
    app.globalData.userInfo = userInfo.data

    wx.setStorageSync('userInfo', userInfo.data)
  },
  change(e) {
    const value = e.detail.value ?? e.detail
    const key = `formData.${e.currentTarget.dataset.name}`
    this.setData({
      [key]: value
    })
  },
  async bindchooseavatar(e) {
    const tempFileUrl = e.detail.avatarUrl
    const res = await uploadImgs([tempFileUrl], this)
    this.setData({
      ['formData.avatar']: res
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        formData: userInfo
      })
    }
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