import { Service } from 'egg';
import { IMovie } from '../type/IMovie';
import { Op } from 'sequelize'

export default class Test extends Service {

	public async addMovie(movie: IMovie) {
		const { ctx } = this

		return await ctx.model.Movie.create(movie);
	}

	public async editMovie(id: number, movie: IMovie) {
		const { ctx } = this

		return await ctx.model.Movie.update(movie, {
			where: {
				id,
			},
		})
	}

	public async delMovie(id: number) {
		const { ctx } = this

		return await ctx.model.Movie.destroy({
			where: {
				id,
			},
			force: true, // 控制是真实的物理删除，还是软删除，软删除只会在deleted_at的地方进行标记来说明他是被删除的，物理删除就是把这一条数据删了
		})
	}

	public async findByKey(key: string, page: number, pageSize: number) {
		const { ctx } = this

		return await ctx.model.Movie.findAndCountAll({
			where: {
				name: {
					[Op.like]: `%${key}%`,
				},
			},
			offset: (page - 1) * pageSize, // 开始的数据索引，比如当page=2 时offset=10 ，而pagesize我们定义为10，则现在为索引为10，也就是从第11条开始返回数据条目
			limit: pageSize, // 每页限制返回的数据条数
		})
	}

}
