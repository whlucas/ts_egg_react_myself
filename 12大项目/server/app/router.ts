import { Application } from 'egg';

export default (app: Application) => {
	const { controller, router } = app;

	router.get('/', controller.pageInit.index)

	router.get('/findAllMovie', controller.movie.findAllMovie)

	router.get('/findById/:id', controller.movie.findById)

	router.post('/findByKey', controller.movie.findByKey)

	router.post('/addMovie', controller.movie.addMovie)

	router.post('/editMovie', controller.movie.editMovie)

	router.post('/delMovie', controller.movie.delMovie)

	router.post('/upload', controller.movie.upload)
};
