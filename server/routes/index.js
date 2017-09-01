module.exports = (app) => {
	const controller = app.controllers.products;
    
    app.get('/api/items', controller.lista);
    app.get('/api/items/:id', controller.get);
    
	return app;
};
