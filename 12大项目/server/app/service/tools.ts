import { Service } from 'egg';
import path from 'path'
import sd from 'silly-datetime'
import mkdirp from 'mz-modules/mkdirp'


/**
 * Test Service
 */
export default class Test extends Service {

	/**
	 * sayHi to you
	 * @param name - your name
	 */
	public async sayHi(name: string) {
		return `hi, ${name}`;
	}

	public async getTime() {

		const d = new Date();

		return d.getTime();

	}

	public async getUploadFile(filename) {

		// 1、获取当前日期     20180920
		// 用这个包来获取一个年月日格式的日期
		const day = sd.format(new Date(), 'YYYYMMDD');

		// 2、创建图片保存的路径

		const dir = path.join(this.config.uploadDir, day);

		// 看看这个路劲有没有，没有就创建一个
		await mkdirp(dir);

		const d = await this.getTime(); /* 毫秒数*/


		// 返回图片保存的路径
		// 我这个服务器是按照时间戳保存，这样大概率不会出现重复的文件名被覆盖
		// path.extname() 获取后缀
		const uploadDir = path.join(dir, d + path.extname(filename));


		// app\public\admin\upload\20180914\1536895331444.png
		return {
			uploadDir, // 上传的路径
			// 数据库保存的路径把app去掉，把\改成/   前端页面展示请求静态文件的时候src里面不要带app
			saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
		};


	}
}
