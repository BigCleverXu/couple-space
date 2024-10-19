import {
	hideLoading,
	showMessage,
	showToast
} from '../utils/index'
export class Request {
	constructor(that) {
		this.that = that;
	}
	submit(data) {
		return new Promise((resolve) => {
			showToast({
				that: this.that,
				theme: 'loading',
				message: "正在提交"
			})
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data
			}).then(res => {
				hideLoading();
				if (res.result.success) {
					showMessage({
						that: this.that,
						content: "提交成功"
					})
					resolve(res.result.data)
				} else {
					showMessage({
						that: this.that,
						type: "error",
						content: res.result.data
					})
				}
			})
		})
	}
	info(data) {
		return new Promise((resolve) => {
			showToast({
				that: this.that,
				theme: 'loading',
				message: "正在获取"
			})
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data
			}).then(res => {
				hideLoading();
				if (res.result.success) {
					resolve(res.result.data)
				} else {
					showMessage({
						that: this.that,
						type: "error",
						content: res.result.data
					})
				}
			})
		})
	}
}