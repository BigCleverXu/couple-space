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
export function showLoading(that, message = '正在加载') {
	Toast({
		context: that,
		selector: '#t-toast',
		message,
		theme: 'loading',
		direction: 'column',
		duration: 0,
	});
}
export function hideLoading() {
	hideToast();
}

export function uploadImgs(tempFilePaths, that) {
	showLoading(that, '正在上传')
	return new Promise((resolve) => {
		for (let i = 0; i < tempFilePaths.length; i++) { //多个图片的循环上传
			wx.cloud.uploadFile({ //上传至微信云存储
				cloudPath: 'image/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg", //使用时间戳加随机数作为上传至云端的图片名称
				filePath: tempFilePaths[i], // 本地文件路径
				success: res => {
					hideToast();
					console.log("上传成功", res.fileID)
					resolve(res.fileID)
				}
			})
		}
	})

}