module.exports = function department_controller( app ){
	
	app.get("/department", function( req, res ){
		res.render('department');
	});
	
};