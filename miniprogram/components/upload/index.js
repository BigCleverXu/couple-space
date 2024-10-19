// components/upload/index.js
import {
  removeFiles,
  uploadImgsOfObjArr
} from '../../utils/index'
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
    async handleAdd(e) {
      // console.log(e);
      const {
        files
      } = e.detail;
      console.log(files);
      const cloudPath = await uploadImgsOfObjArr(files.map(m => m.url), this)
      this.setData({
        originFiles: this.data.originFiles.concat(cloudPath),
      });
      this.emitFiles()
    },
    handleSuccess(e) {
      // const {
      //   files
      // } = e.detail;
      // this.setData({
      //   originFiles: this.data.originFiles.concat(files),
      // });
      // this.emitFiles()
    },
    async handleRemove(e) {
      const {
        index
      } = e.detail;
      const {
        originFiles
      } = this.data;
      await removeFiles([originFiles[index].url])
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