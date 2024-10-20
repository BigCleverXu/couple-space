import Message from 'tdesign-miniprogram/message/index';
import Toast, {
	hideToast
} from 'tdesign-miniprogram/toast/index';

/**
 * 预览方法
 * @param {*} e 方法的e 
 */
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

/**
 * 跳转方法
 * @param {*} path 跳转页面path
 * @param {*} params 参数
 */
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

/**
 * 弹出message
 * @param {Object} param
 */
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

/**
 * toast显示
 * @param {Object} param 
 */
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

/**
 * 加载状态 
 * @param {*} that 
 * @param {String} message 
 */
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

/**
 * 隐藏加载状态
 */
export function hideLoading() {
	hideToast();
}

/**
 * 文件上传
 * @param {Array<string>} tempFilePaths 
 * @param {*} that 
 */
export function uploadImgs(tempFilePaths, that) {
	showLoading(that, '正在上传')
	return new Promise(async (resolve) => {
		let fileIDArr = []
		for (let i = 0; i < tempFilePaths.length; i++) { //多个图片的循环上传
			const res = await wx.cloud.uploadFile({ //上传至微信云存储
				cloudPath: 'image/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg", //使用时间戳加随机数作为上传至云端的图片名称
				filePath: tempFilePaths[i], // 本地文件路径
			})
			hideToast();
			console.log("上传成功", res.fileID)
			fileIDArr.push(res.fileID)
		}
		console.log(fileIDArr, 'fileIDArr');
		resolve(fileIDArr)
	})
}

/**
 * 文件上传 返回url格式
 * @param {Array<string>} tempFilePaths 
 * @param {*} that 
 */
export function uploadImgsOfObjArr(tempFilePaths, that) {
	showLoading(that, '正在上传')
	return new Promise(async (resolve) => {
		let fileIDArr = []
		for (let i = 0; i < tempFilePaths.length; i++) { //多个图片的循环上传
			const res = await wx.cloud.uploadFile({ //上传至微信云存储
				cloudPath: 'image/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg", //使用时间戳加随机数作为上传至云端的图片名称
				filePath: tempFilePaths[i], // 本地文件路径
			})
			hideToast();
			console.log("上传成功", res.fileID)
			fileIDArr.push(res.fileID)
		}
		console.log(fileIDArr, 'fileIDArr');
		resolve(fileIDArr.map(m => {
			return {
				url: m
			}
		}))
	})
}

/**
 * 删除文件
 * @param {Array<string>} fileIDs 
 */
export function removeFiles(fileIDs) {
	return new Promise((resolve) => {
		if (fileIDs.length) {
			wx.cloud.deleteFile({
				fileList: fileIDs, // 对象存储文件ID列表，最多50个，从上传文件接口或者控制台获取
			}).then(res => {
				resolve()
			}).catch(err => {})
		}
		resolve()
	})
}

/**
 * 对象深拷贝函数
 * @param {*} initalObj 
 */
export function deepClone(initalObj) {
	var obj = {};
	obj = JSON.parse(JSON.stringify(initalObj));
	return obj;
}

/**
 * 根据怕openId 获取个人数据
 * @param {*} arr 
 * @param {string} openId 
 */
export function getUserByOpenId(arr, openId) {
	return arr.find(f => f._openid == openId)
}

/**
 * 转url数组对象
 * @param {*} arr 
 */
export function urlToObj(arr) {
	const _arr = deepClone(arr)
	return _arr.map(m => {
		return {
			url: m
		}
	})
}