export class ResponseHelper {
	/**
	 * 错误返回格式
	 */
	public static sendError(error: string | string[]) {
		let err: string
		if(Array.isArray(error)) {
			err = error.join(',')
		}else {
			err = error
		}
		// 返回一个相应对象
		return {
			err,
			data: null,
		}
	}

	/**
	 * 普通数据返回格式
	 */
	public static sendData(data: any) {
		// 返回一个相应对象
		return {
			err: '',
			data,
		}
	}

	/**
	 * 分页数据返回格式
	 */
	public static sendPagrData(data: any, count: number) {
		// 返回一个相应对象
		return {
			err: '',
			data,
			count,
		}
	}
}
