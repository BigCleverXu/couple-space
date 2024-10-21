// pages/anniversary/anniversary-form/index.js
import {
  showMessage,
  showToast,
  hideLoading,
  deepClone
} from '../../../utils/index'
import {
  Request
} from '../../../utils/request'
import dayjs from '../../../miniprogram_npm/dayjs/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "纪念日",
    show: false,
    formData: {
      title: "",
      date: new Date().getTime(),
      dateText: "",
      isBirth: false,
      image: []
    }
  },
  change(e) {
    const value = e.detail.value ?? e.detail
    const key = `formData.${e.currentTarget.dataset.name}`
    console.log(e);
    this.setData({
      [key]: value
    })
  },
  handleFormData() {
    let _formData = deepClone(this.data.formData)
    _formData.image = this.data.formData.image.map(m => m.url)
    return _formData
  },
  async submit(e) {
    const request = new Request()
    const formData = this.handleFormData()
    await request.create('anniversary', formData)
    wx.navigateBack()
  },
  delete() {
    this.setData({
      show: true
    })
  },
  closeDialog() {
    this.setData({
      show: false
    })
  },
  confirmDialog() {
    showToast({
      that: this,
      theme: "loading",
      duration: 0,
      message: "正在删除"
    })
    setTimeout(() => {
      this.closeDialog()
      hideLoading()
      showMessage({
        that: this,
        content: "删除成功",
        type: "success"
      })
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
    const {
      id
    } = options
    if (id) {
      this.setData({
        title: "编辑纪念日"
      })
    }
  },
  init() {
    const dateText = dayjs().format('YYYY-MM-DD')
    this.setData({
      'formData.dateText': dateText
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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