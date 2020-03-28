
const rule = {
	addMovie: {
		timeLong: [
			{ required: true },
			{ type: 'number', message: 'timeLong 必须为数字' },
		],
		types: [
			{ required: true },
			{ type: 'string', message: 'type 必须为字符串' },
		],
		name: [
			{ required: true },
			{ type: 'string', message: 'name 必须为字符串' },
		],
		areas: [
			{ required: true },
			{ type: 'string', message: 'areas 必须为字符串' },
		],
	},
	editMovie: {
		id: [
			{ required: true },
			{ type: 'number', message: 'id 必须为数字' },
		],
		// 没传就不要验证了
		timeLong: [
			{ required: false },
			{ type: 'number', message: 'timeLong 必须为数字' },
		],
		type: [
			{ required: false },
			{ type: 'string', message: 'type 必须为字符串' },
		],
		name: [
			{ required: false },
			{ type: 'string', message: 'name 必须为字符串' },
		],
		areas: [
			{ required: false },
			{ type: 'string', message: 'areas 必须为字符串' },
		],
	},
	delMovie: {
		id: [
			{ required: true },
			{ type: 'number', message: 'id 必须为数字' },
		],
	},
}

module.exports = rule

