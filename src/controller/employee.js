module.exports = function employee_controller( app ){
	
	app.get("/employee", function( req, res ){
		res.render('employee');
	});
	
};