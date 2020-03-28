module.exports = app => {
	if (app.config.env === 'local' || app.config.env === 'unittest') {
		app.beforeStart(async () => {
			// 这个在开始开发的时候一定要改成false,否则update数据库的时候他就给你全删了在更新,就报错了
			await app.model.sync({ force: false });
		});
	}
};
