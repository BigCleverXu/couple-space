// pages/anniversary/index.js
import {
  to,
  showMessage,
  showToast,
  hideLoading,
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
    nearInfo: {}
  },
  toShowInfo() {
    this.setData({
      showDrawer: true
    })
  },
  closeDrawer() {
    this.setData({
      showDrawer: false
    })
  },
  toAdd(e) {
    console.log(e);

    const {
      id
    } = e.currentTarget.dataset
    let query = {}
    if (id) {
      query = {
        id
      }
    }
    this.closeDialog()
    this.closeDrawer()
    to("/pages/anniversary/anniversary-form/index", query)
  },
  delete(e) {
    const {
      id
    } = e.currentTarget.dataset
    this.setData({
      showDialog: true
    });
    // console.log(e);
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
      this.closeDrawer()
      hideLoading()
      showMessage({
        that: this,
        content: "删除成功",
        type: "success"
      })
    }, 500)
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
      nearInfo: _sort[0]
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