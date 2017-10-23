module.exports = {

		selectNewDeptId: function(){
			return ` 
				SELECT 
					CREATE_DEPT_ID() 
				FROM 
					DUAL 
			`;
		},
		
	};
