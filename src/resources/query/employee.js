module.exports = {

		// 소속 직원관리항목 추가
		insertEmpItemKeyInfo: ` 
				INSERT 
				INTO 
					TB_EMP_ITEM_KEY( 
						DEPT_ID, 
						EMP_ITEM_ID, 
						EMP_ITEM_NAME, 
						EMP_ITEM_SORT  
					) VALUES ( 
						:deptId, 
						CREATE_EMP_ITEM_ID(), 
						:empItemName, 
						:empItemSort 
					) 
			`,
			
		// 소속 직원관리항목 삭제
		deleteEmpItemKeyInfoByDeptId: `
				DELETE 
				FROM 
					TB_EMP_ITEM_KEY 
				WHERE 
					DEPT_ID = :deptId
			`,
	};
