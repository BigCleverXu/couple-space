import {
	hideLoading,
	showMessage,
	showLoading
} from '../utils/index'
export class Request {
	constructor(that) {
		this.that = that;
	}
	create(type, formData) {
		return new Promise((resolve) => {
			showLoading(this.that, "正在提交")
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data: {
					type,
					action: "create",
					data: formData
				}
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
	update(type, formData) {
		return new Promise((resolve) => {
			const _id = formData._id
			const submitData = {
				...formData,
				_id: undefined
			}
			showLoading(this.that, "正在提交")
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data: {
					type,
					action: "update",
					_id,
					data: submitData
				}
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
	info(type, _id) {
		return new Promise((resolve) => {
			showLoading(this.that, "正在获取")
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data: {
					action: "info",
					type,
					_id
				}
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