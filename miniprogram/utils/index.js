import Message from 'tdesign-miniprogram/message/index';
import Toast, {
	hideToast
} from 'tdesign-miniprogram/toast/index';
export function previewByUrl(e) {
	const {
		url
	} = e.currentTarget.dataset
	// console.log(url);
	wx.previewImage({
		current: url,
		urls: [url],
	})
}
export function to(path, params = {}) {
	let query = ""
	const keys = Object.keys(params)
	keys.forEach((key, idx) => {
		query += `${idx==0?"?":""}${key}=${params[key]}${idx==keys.length-1 ? '':'&'}`
	})
	console.log(query)
	wx.navigateTo({
		url: path + query
	})
}
export function showMessage({
	that,
	type = "success",
	duration = 2000,
	content
}) {
	Message[type]({
		context: that,
		offset: [90, 32],
		duration,
		content,
	});
}
export function showToast({
	that,
	message = '成功',
	theme = 'success',
	duration = 0
}) {
	Toast({
		context: that,
		selector: '#t-toast',
		message,
		theme,
		direction: 'column',
		duration,
	});
}
export function hideLoading() {
	hideToast();
}

/**
 * 
 * @param {object} data 
 * @param {string} data.type 数据库名字
 * @param {string} data.action 方法
 * @param {object} data.data 数据
 * @param {this} that 
 */
export function submit(data, that) {
	return new Promise((resolve) => {
		showToast({
			that,
			theme: 'loading',
			message: "正在提交"
		})
		wx.cloud.callFunction({
			name: "cloudFunctions",
			data
		}).then(res => {
			hideToast();
			if (res.result.success) {
				showMessage({
					that,
					content: "提交成功"
				})
				resolve(res.result.data)
			} else {
				showMessage({
					that,
					type: "error",
					content: res.result.data
				})
			}
		})
	})
}

export function info(data, that) {
	return new Promise((resolve) => {
		showToast({
			that,
			theme: 'loading',
			message: "正在获取"
		})
		wx.cloud.callFunction({
			name: "cloudFunctions",
			data
		}).then(res => {
			hideToast();
			if (res.result.success) {
				resolve(res.result.data)
			} else {
				showMessage({
					that,
					type: "error",
					content: res.result.data
				})
			}
		})
	})
}