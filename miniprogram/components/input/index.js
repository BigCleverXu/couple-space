// components/input/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {
      type: String
    },
    placeholder: {
      type: String,
      value: "请输入"
    },
    type: {
      type: String,
      value: "text"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(e) {
      const {
        value
      } = e.detail
      this.triggerEvent('change', value)
    },
  }
})