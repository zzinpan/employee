module.exports = function DepartmentController( app ){
	
	var departmentService = require("../service/DepartmentService.js");
	
	/**
	 * @desc 화면 표시
	 */
	app.get("/department", function( req, res ){
		res.render('department');
	});
	
	/**
	 * @desc 신규 소속 등록
	 * @param 
	 */
	app.post("/department/createDeptInfo", function( req, res ){
		
		var deptName = req.body.deptName;
		var deptSort = req.body.deptSort;
		
		departmentService.createDeptInfo( deptName, deptSort );
		 res.send({ result: "SUCCESS", data: null });
		
	});
	
};