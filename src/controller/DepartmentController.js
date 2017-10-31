module.exports = function DepartmentController( app ){
	
	var departmentService = require("../service/DepartmentService.js");
	
	/**
	 * @desc 화면 표시
	 */
	app.get("/department", function( req, res ){
		res.render('department');
	});
	
	/**
	 * @desc 소속 등록
	 */
	app.post("/department/modifyDeptInfo", function( req, res ){
		
		var deptId = req.body.deptId;
		var deptName = req.body.deptName;
		var deptSort = req.body.deptSort;
		var empItemNames = req.body.empItemNames;
		
		departmentService.modifyDeptInfo( deptId, deptName, deptSort, empItemNames, function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
	/**
	 * @desc 소속 수정
	 */
	app.post("/department/createDeptInfo", function( req, res ){
		
		var deptName = req.body.deptName;
		var deptSort = req.body.deptSort;
		var empItemNames = req.body.empItemNames;
		
		departmentService.createDeptInfo( deptName, deptSort, empItemNames, function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
	/**
	 * @desc 소속목록 조회
	 */
	app.post("/department/getDeptList", function( req, res ){
		
		departmentService.getDeptList( function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
	/**
	 * @desc 소속수 조회
	 */
	app.post("/department/getDeptCnt", function( req, res ){
		
		departmentService.getDeptCnt( function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
	/**
	 * @desc 소속 삭제
	 */
	app.post("/department/removeDeptInfo", function( req, res ){
		
		var deptId = req.body.deptId;
		departmentService.removeDeptInfo( deptId, function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
	/**
	 * @desc 소속 조회
	 */
	app.post("/department/getDeptInfo", function( req, res ){
		
		var deptId = req.body.deptId;
		departmentService.getDeptInfo( deptId, function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});

	/**
	 * @desc 소속직원관리항목 조회
	 */
	app.post("/department/getDeptEmpItemList", function( req, res ){
		
		var deptId = req.body.deptId;
		departmentService.getDeptEmpItemList( deptId, function( error, result ){
			if( error == null ){
				res.send({ result: "SUCCESS", data: result });
			}else{
				res.send({ result: "FAIL", data: error });
			}
		} );
		
	});
	
};