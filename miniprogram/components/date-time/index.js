// components/date-time/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    start: {
      type: String,
      value: "1970-01-01 00:00:00"
    },
    end: {
      type: String,
      value: "2099-12-31 23:59:59"
    },
    dateText: {
      type: String
    },
    date: {
      type: Number,
      value: new Date().getTime(), // 支持时间戳传入
    },
    title: {
      type: String,
      value: "标题"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPicker(e) {
      this.setData({
        visible: true,
      });
    },
    hidePicker() {
      this.setData({
        visible: false,
      });
    },
    onConfirm(e) {
      const {
        value
      } = e.detail;
      console.log('confirm', value);
      this.setData({
        dateText: value
      });
      this.triggerEvent("change", new Date(value).getTime())
      this.hidePicker();
    },
    onColumnChange(e) {
      console.log('pick', e.detail.value);
    },
  }
})