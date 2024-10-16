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
	duration
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