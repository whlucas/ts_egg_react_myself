import { Controller } from 'egg';
import fs from 'fs'
import path from 'path'

class PageController extends Controller {
	public async index() {
		const { ctx } = this
		ctx.response.type = 'html'
		ctx.body = fs.readFileSync(path.resolve(__dirname, '../public/build/index.html'))
	}
}

module.exports = PageController;
