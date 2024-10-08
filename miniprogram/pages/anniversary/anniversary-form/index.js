// pages/anniversary/anniversary-form/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      title: "",
      date: new Date().getTime(),
      dateText: "",
      images: []
    }
  },
  change(e) {
    const value = e.detail
    const key = `formData.${e.currentTarget.dataset.name}`
    console.log(e);
    this.setData({
      [key]: value
    })
  },
  changeValue(e) {
    const value = e.detail.value
    const key = `formData.${e.currentTarget.dataset.name}`
    this.setData({
      [key]: value
    })
  },
  submit(e) {
    // console.log(e);
  },
  delete() {

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