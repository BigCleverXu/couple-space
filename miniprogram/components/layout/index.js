// components/layout/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "小窝"
    },
    back: {
      type: Boolean,
      value: false
    },
    status: {
      type: Object,
      value: {
        theme: "",
        title: "",
        description: ""
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {

  }
})