module.exports = function ItemController( app ){
	
	app.get("/item", function( req, res ){
		res.render('item');
	});
	
};