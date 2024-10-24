// pages/ticket/ticket-form/index.js
const dayjs = require('dayjs')
import {
  Request
} from '../../../utils/request'
import {
  deepClone,
  showMessage
} from '../../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: {},
    formData: {
      name: "",
      startDate: new Date().getTime(),
      startDateText: "",
      endDate: new Date().getTime(),
      endDateText: "",
      size: 1,
      useSize: 0,
      remark: "",
      hasUser: ""
    }
  },
  async submit() {
    const formData = this.data.formData
    if (!formData.name) {
      showMessage({
        that: this,
        content: "券名必填",
        type: "error"
      })
      return
    }
    if (!formData.size) {
      showMessage({
        that: this,
        content: "数量必填",
        type: "error"
      })
      return
    }
    let _formData = deepClone(formData)
    _formData.startDate = dayjs(formData.startDate).startOf('day').valueOf()
    _formData.endDate = dayjs(formData.endDate).endOf('day').valueOf()
    const request = new Request()
    await request.create('ticket', formData)
    wx.navigateBack()
  },
  change(e) {
    const value = e.detail.value ?? e.detail
    const key = `formData.${e.currentTarget.dataset.name}`
    console.log(e);
    this.setData({
      [key]: value
    })
  },
  init() {
    const userList = wx.getStorageSync('userList') || []
    const openId = wx.getStorageSync('openId')
    const user = userList.find(f => f._openid != openId) || {}
    this.setData({
      'formData.hasUser': user._openid,
      'formData.startDateText': dayjs().format('YYYY-MM-DD'),
      'formData.endDateText': dayjs().format('YYYY-MM-DD')
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