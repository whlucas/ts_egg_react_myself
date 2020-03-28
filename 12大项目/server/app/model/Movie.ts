// 配置好了直接在这里面定义表
module.exports = app => {
	const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

	const Movie = app.model.define('movie', {
		name: STRING,
		types: STRING,
		areas: STRING,
		timeLong: INTEGER,
		isHot: BOOLEAN,
		isComing: BOOLEAN,
		isClassic: BOOLEAN,
		description: STRING,
		poster: STRING,
	}, {
		// 其他的配置参数在这个里面写
		freezeTableName: true, // 使用默认表名，不会变复数
	});

	return Movie;
};
