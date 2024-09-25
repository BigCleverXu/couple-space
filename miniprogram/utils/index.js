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