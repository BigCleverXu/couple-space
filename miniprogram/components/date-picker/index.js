// components/date-picker/index.js
import {
  days,
  months
} from './data'
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    hasMonth: {
      type: Boolean,
      value: true
    },
    hasDay: {
      type: Boolean,
      value: true
    },
    defaultValue: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    month: months,
    day: days,
    visible: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const {
        value
      } = e.detail;

      console.log('picker change:', e.detail);
      this.triggerEvent('change', e.detail)
      this.setData({
        visible: false,
        value: value,
        text: value.join('-'),
      });
    },

    onPickerCancel(e) {
      console.log(e, '取消');
      this.setData({
        visible: false,
      });
    },
    onSeasonPicker() {
      this.setData({
        visible: true
      });
    },
  }
})