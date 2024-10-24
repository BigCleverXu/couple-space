// components/ticket/index.js
import {
  to
} from '../../utils/index'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Boolean,
      value: true
    },
    info: {
      type: Object,
      value: {}
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