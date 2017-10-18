module.exports = function item_controller( app ){
	
	app.get("/item", function( req, res ){
		res.render('item');
		console.log("item");
	});
	
};