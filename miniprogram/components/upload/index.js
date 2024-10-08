// components/upload/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "图片"
    },
    max: {
      type: Number,
      value: 0
    },
    mediaType: {
      type: Array,
      value: ['video', 'image']
    },
    gridConfig: {
      type: Object,
      value: {
        column: 4,
        width: 160,
        height: 160,
      }
    },
    config: {
      type: Object,
      value: {
        count: 9
      }
    },
    originFiles: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    emitFiles() {
      this.triggerEvent("change", this.data.originFiles)
    },
    handleSuccess(e) {
      const {
        files
      } = e.detail;
      this.setData({
        originFiles: files,
      });
      this.emitFiles()
    },
    handleRemove(e) {
      const {
        index
      } = e.detail;
      const {
        originFiles
      } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
      this.emitFiles()
    },
    handleClick(e) {
      console.log(e.detail.file);
    },
  }
})