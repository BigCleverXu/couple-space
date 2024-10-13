// pages/assistant/index.js
const dayjs = require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      date: "9"
    },
    date: new Date().getTime(),
    minDate: new Date("2024-10-01").getTime()
  },
  change(e) {
    this.setData({
      ['formData.date']: e.detail.value[0]
    })
    this.initDate()
    // console.log(e.detail);
  },
  initDate() {
    this.setData({
      format: (day) => {
        const {
          date
        } = day;
        for (let index = 0; index < 7; index++) {
          let start = dayjs(`${dayjs(date).format('YYYY-MM')}-${+this.data.formData.date}`).add(index, 'day').get('D').valueOf()
          if (dayjs(date).get('D').valueOf() == start) {
            day.className = 'is-err-day';
            day.prefix = '姨妈';
            day.suffix = `第${index+1}天`;
          }
        }

        return day;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(() => {
      this.initDate()
    }, 100)
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