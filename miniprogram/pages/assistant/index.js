// pages/assistant/index.js
const dayjs = require('dayjs')
import {
  deepClone
} from '../../utils/index'
import {
  Request
} from '../../utils/request'
import {
  getSysInfo
} from '../../utils/system'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      date: 1
    },
    sysInfo: {},
    date: new Date().getTime(),
    minDate: new Date("2024-01-01").getTime()
  },

  async change(e) {
    wx.requestSubscribeMessage({
      tmplIds: ['K322gM1NrIq6hQm2dTQHCAJfaC0tq-WBAuOawhtayYA'],
    }).then(async () => {
      this.setData({
        ['formData.date']: e.detail.value[0]
      })
      const request = new Request()
      const sysInfo = this.data.sysInfo
      let _sysInfo = deepClone(sysInfo)
      _sysInfo.menstrual = this.data.formData.date
      if (_sysInfo._id) {
        _sysInfo.banner = sysInfo.banner.map(m => m.url) || []
        await request.update('system', _sysInfo)
      } else {
        await request.create('system', _sysInfo)
      }
      await getSysInfo()
      this.initDate()
    })

  },
  initDate() {
    const sysInfo = wx.getStorageSync('sysInfo') || {}
    this.setData({
      sysInfo,
      minDate: dayjs().startOf('month').valueOf(),
      'formData.date': sysInfo.menstrual
    })
    /**
     * 判断当月是否有31号如果有就从31号开始往后数7天
     * 如果没有就从下月1号开始往后数7天
     */
    let arr = []
    //获取今天
    const today = dayjs()
    for (let index = 0; index < 7; index++) {
      //开始计算从当前月开始的日期
      const currentMonth = today.add(index, 'month')
      //年
      const year = dayjs(currentMonth).format('YYYY')
      //月
      const month = dayjs(currentMonth).format('MM')
      //选中的日
      const date = `${this.data.formData.date}`
      //完整的日期
      let fullYear = dayjs(`${year}-${month}-${date}`)
      //判断二月的日期
      const hasDate = ['29', '30', '31'].includes(date)
      if (month == '02' && hasDate) {
        fullYear = dayjs(`${year}-${month}`).startOf('month').add(1, 'month')
      }
      for (let j = 0; j < 7; j++) {
        arr.push({
          date: fullYear.add(j, 'day').format('YYYY-MM-DD'),
          index: j + 1
        })
      }
    }
    console.log(arr);
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