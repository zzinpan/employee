$(function common(){
	
	/**
	 * @desc 업무로직 실패 응답 함수
	 */
	function XHRerror(){
		console.log( arguments );
		alert("관리자에게 문의하세요.");
	}
	
	/**
	 * @desc 업무로직 성공 응답 함수
	 * @param Function callback
	 * @return String response.result : "SUCCESS" || "FAIL"
	 * @return String response.data : 결과데이터
	 */
	function XHRsuccess( callback ){
		return function( response ){
			
			// 업무로직이 성공이라면, 사용자 콜백 실행
			if( response.result === "SUCCESS" ){
				if( typeof callback === "function" ){
					callback( response.data );
				}
				
			// 업무로직이 실패라면, 에러 발생
			}else if( response.result === "FAIL" ){
				console.log( arguments );
				alert("관리자에게 문의하세요.");
			}
			
		}
	}
	
	window.XHR = {
		
			/**
			 * 소속추가
			 */
			createDeptInfo: function createDeptInfo( deptName, deptSort, empItemNames, callback ){
				
				$.ajax({
					url: "/department/createDeptInfo",
					type: "post",
					data: {
						deptName: deptName,
						deptSort: deptSort,
						empItemNames: empItemNames
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속수정
			 */
			modifyDeptInfo: function modifyDeptInfo( deptId, deptName, deptSort, empItemNames, callback ){
				
				$.ajax({
					url: "/department/modifyDeptInfo",
					type: "post",
					data: {
						deptId: deptId,
						deptName: deptName,
						deptSort: deptSort,
						empItemNames: empItemNames
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속목록조회
			 */
			getDeptList: function getDeptList( callback ){
				
				$.ajax({
					url: "/department/getDeptList",
					type: "post",
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속수 조회
			 */
			getDeptCnt: function getDeptCnt( callback ){
				
				$.ajax({
					url: "/department/getDeptCnt",
					type: "post",
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속 삭제
			 */
			removeDeptInfo: function removeDeptInfo( deptId, callback ){
				
				$.ajax({
					url: "/department/removeDeptInfo",
					type: "post",
					data: {
						deptId: deptId
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속 조회
			 */
			getDeptInfo: function getDeptInfo( deptId, callback ){
				
				$.ajax({
					url: "/department/getDeptInfo",
					type: "post",
					data: {
						deptId: deptId
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속 직원관리목록 조회
			 */
			getDeptEmpItemList: function getDeptEmpItemList( deptId, callback ){
				
				$.ajax({
					url: "/department/getDeptEmpItemList",
					type: "post",
					data: {
						deptId: deptId
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			}
			
	};
	
});