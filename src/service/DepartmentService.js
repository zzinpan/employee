module.exports = (function DepartmentService(){
	
	var departmentDao = require("../dao/DepartmentDao.js");
	
	return {
		createDeptInfo: function createDeptInfo( deptName, deptSort ){
			
			var deptId = departmentDao.selectNewDeptId();
			
		}
	};
	
})();