module.exports = (function DepartmentDao(){
	
	var dbConnector = require('./DBConnector.js');
	var departmentQuery = require('../resources/query/department.js');
	
	return {
		selectNewDeptId: function selectNewDeptId(){
			
			var deptId = dbConnector.selectValue( departmentQuery.selectNewDeptId() );
			dbConnector.
			
		}
	};
	
})();