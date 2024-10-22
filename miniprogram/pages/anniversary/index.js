// pages/anniversary/index.js
import {
  to,
  deepClone
} from '../../utils/index'
import {
  Request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDrawer: false,
    showDialog: false,
    list: [],
    nearInfo: {},
    showInfo: {},
    id: ""
  },
  toShowInfo(e) {
    const showInfo = e.currentTarget.dataset.info
    // console.log(e);
    this.setData({
      showDrawer: true,
      showInfo
    })
  },
  closeDrawer() {
    this.setData({
      showDrawer: false
    })
  },
  toAdd() {
    let query = {}
    const {
      _id
    } = this.data.nearInfo
    if (_id) {
      query = {
        id: _id
      }
    }
    this.closeDialog()
    this.closeDrawer()
    to("/pages/anniversary/anniversary-form/index", query)
  },
  delete() {
    this.setData({
      showDialog: true
    });
    // console.log(e);
  },
  async confirmDialog() {
    const request = new Request()
    await request.remove('anniversary', this.data.showInfo._id)
    this.init()
    this.closeDialog()
    this.closeDrawer()
  },
  closeDialog() {
    this.setData({
      showDialog: false
    });
  },
  async init() {
    const request = new Request()
    const res = await request.list('anniversary')
    const _sort = deepClone(res.data).sort((a, b) => a.diff - b.diff) || []
    this.setData({
      list: res.data,
      nearInfo: _sort.length ? _sort[0] : {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init()
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