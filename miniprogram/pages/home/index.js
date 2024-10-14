// pages/home/index.js
const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];
import {
  to
} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.4f1a35d455269c72bf54ac019dd95b10?rik=Pe6L8lmQk5hlOg&riu=http%3a%2f%2fdesk.fd.zol-img.com.cn%2ft_s960x600c5%2fg5%2fM00%2f0A%2f07%2fChMkJ1Zf6CyIWRXaAARjr0ZnlEEAAFpMgLQ5xwABGPH543.jpg&ehk=7LJMKFFlAN6Ost%2b4D62vwIxl9A1zzQWjvIBTnmq06W0%3d&risl=&pid=ImgRaw&r=0",
    avatar1: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    avatar2: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
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
      visible: true,
      current: e.detail.index
    })
  },
  onClose() {
    this.setData({
      visible: false,
    })
  },
  toInfo(e) {
    to(e.target.dataset.url)
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