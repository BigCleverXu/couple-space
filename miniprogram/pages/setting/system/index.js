// pages/setting/system/index.js
const app = getApp()
import {
  Request
} from '../../../utils/request'
import {
  formatTime
} from '../../../utils/time'
import {
  deepClone,
  urlToObj
} from '../../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      banner: [],
      startDate: new Date().getTime(),
      dateText: "",
    }
  },
  handleFormData() {
    let _formData = deepClone(this.data.formData)
    _formData.banner = this.data.formData.banner.map(m => m.url)
    return _formData
  },
  async submit() {
    const http = new Request(this)
    const formData = this.handleFormData()
    let res;
    let sysInfo;
    if (formData._id) {
      res = await http.update("system", formData)
      sysInfo = {
        ...this.data.formData,
        dateText: formatTime(formData.startDate, 'Y-M-D')
      }
    } else {
      res = await http.create("system", formData)
      const resp = await http.info("system", res._id)
      sysInfo = {
        ...resp.data,
        banner: urlToObj(resp.data.banner),
        dateText: formatTime(resp.data.startDate, 'Y-M-D')
      }
      this.setData({
        formData: sysInfo
      })
    }
    if (sysInfo) {
      app.globalData.sysInfo = sysInfo
      console.log(sysInfo);
      wx.setStorageSync('sysInfo', sysInfo)
    }
    wx.navigateBack()
  },
  async change(e) {
    const value = e.detail.value ?? e.detail
    const name = e.currentTarget.dataset.name
    const key = `formData.${name}`
    console.log(e);
    this.setData({
      [key]: value
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
    const sysInfo = wx.getStorageSync('sysInfo')
    if (sysInfo) {
      console.log(sysInfo);
      this.setData({
        formData: sysInfo
      })
    } else {
      const that = this
      const startDate = that.data.formData.startDate
      this.setData({
        ['formData.dateText']: formatTime(startDate, 'Y-M-D')
      })
    }
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