// components/ticket/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [{
      id: "1",
      itemName: "捶背券",
      active: true,
      size: 5
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    submitCilck(e) {
      const {
        id
      } = e.target.dataset
      console.log(id);
    }
  }
})