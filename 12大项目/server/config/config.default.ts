import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
	const config = {} as PowerPartial<EggAppConfig>;

	// override config from framework / plugin
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1583918362506_5681';

	// add your egg config in here
	config.middleware = [];

	// add your special config in here
	const bizConfig = {
		sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
	};

	// 配置验证器
	config.validatePlus = {
		resolveError(ctx, errors) {
			if (errors.length) {
				ctx.type = 'json';
				ctx.status = 400;
				ctx.body = {
					code: 400,
					error: errors,
					message: '参数错误',
				};
			}
		},
	};

	// npm install mysql2 egg-sequelize --save
	// 配置插件
	// 配置链接数据库
	config.sequelize = {
		dialect: 'mysql',
		host: 'localhost',
		port: 3306,
		database: 'egg_ts',
		username: 'root',
		password: 'Lll-13999520192',
		logging: console.log, // 显示原始的命令行
	};

	exports.assets = {
		publicPath: '/public/build',
	};

	config.security = {
		csrf: {
			enable: false,
		},
	};

	// 上传文件存放地
	config.uploadDir = 'app/public/upload';

	// the return config will combines to EggAppConfig
	return {
		...config,
		...bizConfig,
	};
};
