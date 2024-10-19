class Response {
	success(data) {
		return {
			success: true,
			data
		};
	}
	fail(data) {
		return {
			success: false,
			data
		}
	}
}
module.exports = new Response()