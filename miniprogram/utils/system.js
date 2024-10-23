import {
	getUserByOpenId,
	urlToObj
} from "./index"

export function getOpenId() {
	return new Promise((resolve) => {
		const openId = wx.getStorageSync('openId') || false
		if (!openId) {
			wx.cloud.callFunction({
				name: "cloudFunctions",
				data: {
					type: "openId"
				}
			}).then(({
				result
			}) => {
				if (result.success) {
					wx.setStorageSync('openId', result.data.openId)
				}
				resolve()
			})
		}
	})
}
export function getUserList() {
	return new Promise((resolve) => {
		wx.cloud.callFunction({
			name: "cloudFunctions",
			data: {
				type: "user",
				action: "all"
			}
		}).then(({
			result
		}) => {
			if (result.success) {
				const userList = result.data.data
				wx.setStorageSync('userList', userList)
				const userInfo = getUserByOpenId(result.data.data, wx.getStorageSync('openId'))
				wx.setStorageSync('userInfo', userInfo)
			}
			resolve()
		})
	})

}
export function getSysInfo() {
	return new Promise((resolve) => {
		wx.cloud.callFunction({
			name: "cloudFunctions",
			data: {
				type: "system",
				action: "getOne"
			}
		}).then(({
			result
		}) => {
			if (result.success) {
				console.log(result.data);
				const sysInfo = result.data.data[0]
				if (result.data.data.length) {
					sysInfo.banner = urlToObj(result.data.data[0].banner)
				}
				wx.setStorageSync('sysInfo', sysInfo)
			}
			resolve()
		})
	})
}