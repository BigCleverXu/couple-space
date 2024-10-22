// pages/home/index.js
import {
  to
} from '../../utils/index'
import dayjs from '../../miniprogram_npm/dayjs/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperConfig: {
      autoplay: true,
      duration: 500,
      interval: 5000,
      current: 1,
      navigation: {
        type: 'dots-bar'
      }
    },
    viewerConfig: {
      visible: false,
    },
    sysInfo: {},
    diff: 0,
    avatarLeft: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    avatarRight: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
    tabs: [{
      label: "纪念日",
      img: "/images/icons/calendar.png",
      url: "/pages/anniversary/index"
    }, {
      label: "今天想说",
      img: "/images/icons/bookmark.png",
      url: "/pages/diary/index"
    }, {
      label: "月经助手",
      img: "/images/icons/candle.png",
      url: "/pages/assistant/index"
    }, {
      label: "卡券",
      img: "/images/icons/ticket.png",
      url: "/pages/ticket/index"
    }]
  },
  onPreview(e) {
    this.setData({
      'viewerConfig.visible': true,
      'viewerConfig.current': e.detail.index
    })
  },
  onClose() {
    this.setData({
      'viewerConfig.visible': false,
    })
  },
  toInfo(e) {
    to(e.target.dataset.url)
  },
  init() {
    const sysInfo = wx.getStorageSync('sysInfo')
    const userList = wx.getStorageSync('userList')
    if (sysInfo) {
      const diff = dayjs().diff(sysInfo.startDate, 'day')
      sysInfo.banner = sysInfo.banner.map(m => m.url)
      this.setData({
        sysInfo,
        diff,
        'viewerConfig.images': sysInfo.banner
      })
    }
    if (userList && userList.length) {
      const userLeft = userList.find(f => f.direction == 'LEFT') || {}
      const userRight = userList.find(f => f.direction == 'RIGHT') || {}
      this.setData({
        avatarLeft: userLeft.avatar,
        avatarRight: userRight.avatar
      })
    }
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