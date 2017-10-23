module.exports = function EmployeeController( app ){
	
	app.get("/employee", function( req, res ){
		res.render('employee');
	});
	
};