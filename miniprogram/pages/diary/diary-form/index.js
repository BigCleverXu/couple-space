// pages/anniversary/anniversary-form/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "我想说",
    show: false,
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
    formData: {
      title: "",
      images: []
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
  closeDialog() {
    this.setData({
      show: false
    });
  },
  submit(e) {
    this.setData({
      show: true
    })
    // console.log(e);
  },
  delete() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      id
    } = options
    if (id) {
      this.setData({
        title: "编辑我想说"
      })
    }
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