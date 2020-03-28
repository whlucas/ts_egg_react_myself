import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
	// static: true,
	// nunjucks: {
	//   enable: true,
	//   package: 'egg-view-nunjucks',
	// },

	// 配置验证器
	validatePlus: {
		enable: true,
		package: 'egg-validate-plus',
	},

	// 配置数据库
	sequelize: {
		enable: true,
		package: 'egg-sequelize',
	},

	static: {
		enable: true,
	},
};

export default plugin;
