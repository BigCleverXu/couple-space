// pages/setting/user/index.js
import {
  Request
} from '../../../utils/request'
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
    const res = await http.submit({
      type: "user",
      action: "create",
      data: this.data.formData
    })
    const resp = await http.info({
      type: "user",
      action: "info",
      data: {
        id: res._id
      }
    })
    wx.setStorageSync('userInfo', resp.data)
    // console.log(resp);
    // const res = await submit(
    //{
    //     type: "user",
    //     action: "create",
    //     data: this.data.formData
    //   },
    //   this
    // )
    // const resp = await info({
    //     type: "user",
    //     action: "info",
    //     data: {
    //       id: res._id
    //     }
    //   },
    //   this)
    // console.log(resp);

  },
  change(e) {
    const value = e.detail.value ?? e.detail
    const key = `formData.${e.currentTarget.dataset.name}`
    console.log(e);
    this.setData({
      [key]: value
    })
  },
  bindchooseavatar(e) {
    this.setData({
      ['formData.avatar']: e.detail.avatarUrl
    })
    // console.log(e);
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