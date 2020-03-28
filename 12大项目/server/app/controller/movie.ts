import { Controller } from 'egg';
import { IMovie } from '../type/IMovie';
import { ResponseHelper } from '../lib/responseHelper';
import fs from 'fs';
import pump from 'mz-modules/pump'


export default class MovieController extends Controller {
	public async findAllMovie() {
		const { ctx } = this;

		const result = await ctx.model.Movie.findAll()
		ctx.body = ResponseHelper.sendData(result)
	}

	public async findById() {
		const { ctx } = this;

		// 这个是获取param后面的值
		// const id = ctx.request.query.id;

		// 这个是获取动态路由:后面的值
		const id = this.ctx.params.id

		const result = await ctx.model.Movie.findByPk(id)
		ctx.body = ResponseHelper.sendData(result)
	}

	public async findByKey() {
		const { ctx } = this;

		const { key, page, pageSize } = this.ctx.request.body;

		const result = await ctx.service.movie.findByKey(key, page, pageSize)

		ctx.body = ResponseHelper.sendPagrData(result.rows, result.count)
	}

	public async addMovie() {
		const { ctx } = this;

		const { body } = this.ctx.request;

		const validateResult = await this.ctx.validate('movie.index.addMovie', body);
		if (!validateResult) return

		const res = await ctx.service.movie.addMovie(body)

		ctx.body = ResponseHelper.sendData(res)
	}

	public async editMovie() {
		const { ctx } = this;

		const { body } = this.ctx.request;

		const validateResult = await this.ctx.validate('movie.index.editMovie', body);
		if (!validateResult) return;

		const id = body.id;
		delete body.age;
		const movie: IMovie = {
			...body,
		}
		await ctx.service.movie.editMovie(id, movie);
		// 这里他不会给我发挥结果,打印看一下就知道了
		// 直接给前端返回true
		ctx.body = ResponseHelper.sendData(true)
	}

	public async delMovie() {
		const { ctx } = this;

		const { body } = this.ctx.request;

		const validateResult = await this.ctx.validate('movie.index.delMovie', body);
		if (!validateResult) return

		await ctx.service.movie.delMovie(body.id)
		ctx.body = ResponseHelper.sendData(true)
	}


	public async upload() {

		const { ctx } = this;

		// 接收传过来流中的文件

		// 单文件接收保存
		// 接收单文件用await this.ctx.getFileStream()
		// 可以拿到这个表单提交的其他数据
		// fields = stream.fields
		// 给一个路径,拼接上从流里面获取的文件名
		// const target = 'app/public/admin/upload' + path.basename(stream.filename)  path.basename就是只要后面的文件名，不要路径
		// 创建写文件的流，传入参数写到哪
		// const writeStream = fs.createWriteStream(target);
		// 写文件，用这个写没成功也不会卡死，这个包底层给你实现了报错就销毁的操作
		// await pump(stream, writeStream);
		// 或者，用这个写就得try catch 出错了自己去销毁这个流
		// stream.pipe(writeStream);

		// 注意上传单文件的时候，也就是用getFileStream这个来读取流的时候
		// 其他的东西也就是field里面的东西，最好不要放到文件表单的后面，放到前面去，否则可能拿不到

		// 加了autoFields: true这个数据就是还可以接收表单里面的其他数据，并且放到field里面
		const parts = ctx.multipart();
		let files = {};
		let stream;

		// 由于是多个文件，这里需要一个文件一个文件的读取，只要他没有读取完，就继续读取
		// 所以要写一个循环
		while ((stream = await parts()) != null) {

			// 没传文件就不要写文件了，直接退出
			if (!stream.filename) {
				break;
			}

			// 这个是表单的名字，文件名是filename
			const fieldname = stream.fieldname; // file表单的名字

			// 得到上传图片的目录,把文件名传入
			const dir = await this.service.tools.getUploadFile(stream.filename);
			const target = dir.uploadDir;

			// 创建写文件的流，传入参数写到哪
			const writeStream = fs.createWriteStream(target);

			// 写文件,用这个写文件，如果没成功也不会卡死
			// 文件存到指定的目录里面，url存到数据库里面，到时候调服务器里面的url来访问我这个服务器里面的文件
			await pump(stream, writeStream);

			// 把上传的文件整理成一个对象，因为需要把url存到数据库里面，方便别的地方调取访问
			// 如果有多个表单都要传文件，这里就有多个属性了，数据库表就要多配置几个属性，这里只有一个表单传文件，这里就只有一个属性，数据库里面就配置了这一个表单的的那么值
			files = Object.assign(files, {
				// 这里属性名是表单表的name，不是文件名，因为一次就一张图片，这个files里面循环完了也只有一个属性
				[fieldname]: dir.saveDir,
			});

		}

		// 这是两个表单都要传文件这里处理后的结果，属性名就是两个表单的name值
		// [{"focus_img":"/public/admin/upload/20180914/1536895826566.png"}，{"aaaa":"/public/admin/upload/20180914/1536895826566.png"}]


		// 把所有的文件名，文件目录，和表单里面的其他东西拼到一起写到数据库里面去
		// await this.ctx.model.Focus.create(Object.assign(files, parts.field));

		// {"focus_img":"/public/admin/upload/20180914/1536895826566.png"，"title":"aaaaaaaa","link":"11111111111","sort":"11","status":"1"}

		// 返回一个我上传的路径
		ctx.body = ResponseHelper.sendData(files)
	}
}
