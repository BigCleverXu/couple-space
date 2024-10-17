// components/ticket/index.js
import {
  to
} from '../../utils/index'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {
        id: "1",
        itemName: "捶背券",
        active: true,
        size: 5,
        start: "2024-08-01",
        end: "2024-09-01"
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
    submitCilck(e) {
      const {
        id
      } = e.target.dataset
      to('/pages/qr-page/index', {
        id
      })
      // console.log(id);
    }
  }
})