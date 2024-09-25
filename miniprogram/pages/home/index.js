// pages/home/index.js
import {
  previewByUrl,
  to
} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.4f1a35d455269c72bf54ac019dd95b10?rik=Pe6L8lmQk5hlOg&riu=http%3a%2f%2fdesk.fd.zol-img.com.cn%2ft_s960x600c5%2fg5%2fM00%2f0A%2f07%2fChMkJ1Zf6CyIWRXaAARjr0ZnlEEAAFpMgLQ5xwABGPH543.jpg&ehk=7LJMKFFlAN6Ost%2b4D62vwIxl9A1zzQWjvIBTnmq06W0%3d&risl=&pid=ImgRaw&r=0",
    avatar1: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    avatar2: 'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
  },
  onPreview(e) {
    previewByUrl(e)
  },
  toInfo() {
    to("/pages/anniversary/index")
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