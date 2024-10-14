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
    /**
     * 判断当月是否有31号如果有就从31号开始往后数7天
     * 如果没有就从下月1号开始往后数7天
     */
    let arr = []
    const today = dayjs()
    for (let index = 0; index < 7; index++) {
      const currentMonth = today.add(index, 'month')
      const year = dayjs(currentMonth).format('YYYY')
      const month = dayjs(currentMonth).format('MM')
      const date = this.data.formData.date
      let fullYear = dayjs(`${year}-${month}-${date}`)
      if (month == '02' && ['29', '30', '31'].findIndex(f => f == date) >= -1) {
        fullYear = dayjs(`${year}-${month}`).endOf('month')
      }
      for (let j = 0; j < 7; j++) {
        arr.push({
          date: fullYear.add(j, 'day').format('YYYY-MM-DD'),
          index: j + 1
        })
      }
    }
    this.setData({
      format: (day) => {
        const {
          date
        } = day;
        const fullDate = dayjs(date).format('YYYY-MM-DD')
        const fd = arr.find(f => f.date == fullDate)
        if (fd) {
          day.prefix = "月经";
          day.suffix = `第${fd.index}天`;
          day.className = 'is-err-day';
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