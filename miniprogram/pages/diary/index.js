// pages/diary/index.js
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
    list: [],
    current: 1,
    visible: false,
    images: [],
  },
  onClose() {
    this.setData({
      visible: false
    })
  },
  toAdd() {
    to("/pages/diary/diary-form/index")
  },
  preview(e) {
    const {
      index,
      urls
    } = e.target.dataset
    this.setData({
      images: urls,
      current: index + 1,
      visible: true
    })
    // previewByUrl(e)
  },
  async init() {
    const request = new Request()
    const {
      data
    } = await request.list('dayil')
    this.setData({
      list: data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
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