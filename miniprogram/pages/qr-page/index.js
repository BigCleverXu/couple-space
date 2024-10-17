import {
  showToast,
  hideLoading
} from '../../utils/index'
const QR = require("../../lib/qrcode.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showToast({
      that: this,
      theme: "loading",
      message: "正在生成",
      duration: 0
    })
    //option为上个页面传递过来的参数
    const jiaoyanCode = 'sorry,jiaoyanCode is loss';
    console.log(jiaoyanCode);
    const size = this.setCanvasSize(); //动态设置画布大小	
    this.createQrCode(jiaoyanCode, "canvas", size.w, size.h);
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    let size = {};
    try {
      const res = wx.getWindowInfo();
      const scale = 750 / 686; //不同屏幕下canvas的适配比例；
      const width = res.windowWidth / scale;
      const height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  /**
   * 绘制二维码图片
   */
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      hideLoading()
      this.canvasToTempImage(canvasId);
    }, 1000);
  },

  /**
   * 获取临时缓存照片路径，存入data中
   */
  canvasToTempImage: function () {
    const that = this;
    //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        const tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 点击图片进行预览
   */
  previewImg: function (e) {
    const img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    });
  },
})