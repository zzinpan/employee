module.exports = {

		// 신규 소속 아이디 조회
		selectNewDeptId: ` 
				SELECT 
					CREATE_DEPT_ID() AS DEPT_ID
				FROM 
					DUAL 
			`,
		
		// 소속 정보 추가
		insertDeptInfo: ` 
				INSERT 
				INTO 
					TB_DEPT( 
						DEPT_ID, 
						DEPT_NAME, 
						DEPT_SORT 
					) VALUES ( 
						:deptId, 
						:deptName, 
						:deptSort 
					) 
			`,

		// 소속 정보 수정
		updateDeptInfo: ` 
				UPDATE 
				    TB_DEPT 
				SET 
				    DEPT_NAME = :deptName, 
				    DEPT_SORT = :deptSort, 
				    DEPT_UP_DATE = SYSDATE 
				WHERE 
				    DEPT_ID = :deptId 
			`,
			
		// 소속 목록 조회
		selectDeptList: `
				SELECT
				    DEPT_ID AS "deptId",
				    DEPT_NAME AS "deptName",
				    DEPT_SORT AS "deptSort",
				    DEPT_DELETE_YN AS "deptDeleteYn",
				    DEPT_REG_DATE AS "deptRegDate",
				    DEPT_UP_DATE AS "deptUpDate"
				FROM 
				    TB_DEPT 
			    WHERE 
			    	DEPT_DELETE_YN = 'N' 
			    ORDER BY 
			    	DEPT_SORT 
			`,
			
		// 소속의 직원관리항목 조회
		selectDeptEmpItemList: `
				SELECT 
				    DEPT_ID AS "deptId", 
				    EMP_ITEM_ID AS "empItemId", 
				    EMP_ITEM_NAME AS "empItemName", 
				    EMP_ITEM_SORT AS "empItemSort" 
				FROM 
				    TB_EMP_ITEM_KEY 
				ORDER BY 
				    DEPT_ID, EMP_ITEM_SORT 
		`,
		
		// 소속 수 조회
		selectDeptCnt: `
				SELECT 
				    COUNT(*) AS "deptCnt" 
				FROM 
				    TB_DEPT 
			    WHERE 
			    	DEPT_DELETE_YN = 'N' 
		`,
		
		// 소속 등록에 의한 소속 순서 갱신
		updateDeptSortByInsertDeptInfo: `
				UPDATE 
					TB_DEPT
			    SET
			        DEPT_SORT = DEPT_SORT + 1
				WHERE
				    DEPT_SORT >= :deptSort 
			    AND
					DEPT_DELETE_YN = 'N' 
		`,

		// 소속 수정에 의한 소속 순서 갱신 (증가)
		updateDeptSortByIncrease: `
				UPDATE 
					TB_DEPT
				SET
					DEPT_SORT = DEPT_SORT - 1
				WHERE
					:beforeDeptSort < DEPT_SORT
				AND
					DEPT_SORT <= :afterDeptSort 
				AND
					DEPT_DELETE_YN = 'N' 
		`,

		// 소속 수정에 의한 소속 순서 갱신 (감소)
		updateDeptSortByDecrease: `
				UPDATE 
					TB_DEPT
				SET
					DEPT_SORT = DEPT_SORT + 1
				WHERE
					:afterDeptSort <= DEPT_SORT
				AND
					DEPT_SORT < :beforeDeptSort 
				AND
					DEPT_DELETE_YN = 'N' 
		`,

		// 소속 삭제에 의한 소속 순서 갱신
		updateDeptSortByDeleteDeptInfo: `
				UPDATE 
					TB_DEPT
				SET
					DEPT_SORT = DEPT_SORT - 1
				WHERE
					DEPT_SORT > :deptSort 
				AND
					DEPT_DELETE_YN = 'N' 
		`,
		
		// 소속정보 조회
		selectDeptInfoByDeptId: `
				SELECT
				    DEPT_ID AS "deptId",
				    DEPT_NAME AS "deptName",
				    DEPT_SORT AS "deptSort",
				    DEPT_DELETE_YN AS "deptDeleteYn",
				    DEPT_REG_DATE AS "deptRegDate",
				    DEPT_UP_DATE AS "deptUpDate"
				FROM 
				    TB_DEPT 
				WHERE 
				    DEPT_ID = :deptId
		`,
		
		// 소속정보 삭제
		updateDeptDeleteYnByDeptId: `
				UPDATE 
					TB_DEPT 
				SET 
					DEPT_DELETE_YN = :deptDeleteYn, 
					DEPT_SORT = -1 
				WHERE 
					DEPT_ID = :deptId 
		`,
		
		// 소속 직원관리항목 조회
		selectDeptEmpItemListByDeptId: `
				SELECT 
				    DEPT_ID AS "deptId", 
				    EMP_ITEM_ID AS "empItemId", 
				    EMP_ITEM_NAME AS "empItemName", 
				    EMP_ITEM_SORT AS "empItemSort" 
				FROM 
				    TB_EMP_ITEM_KEY 
				WHERE 
				    DEPT_ID = :deptId 
				ORDER BY 
				    EMP_ITEM_SORT 
		`
		
	};
