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
			}else if( response.result === "SUCCESS" ){
				console.log( arguments );
				alert("관리자에게 문의하세요.");
			}
			
		}
	}
	
	window.XHR = {
		
			/**
			 * @desc 소속추가
			 * @param String deptName
			 * @param Array<String> employeeItemNames
			 */
			createDeptInfo: function createDeptInfo( deptNm, deptSort, empItemNms, callback ){
				
				$.ajax({
					url: "/department/createDeptInfo",
					type: "post",
					data: {
						deptNm: deptNm,
						empItemNms: empItemNms
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			},
			
			/**
			 * 소속목록조회
			 */
			getDepartmentList: function getDepartmentList(){
				
				$.ajax({
					url: "/department/createDepartmentInfo",
					type: "post",
					data: {
						deptNm: deptNm,
						empItemNms: empItemNms
					},
					success: XHRsuccess( callback ),
					error: XHRerror
				});
				
			}
			
	};
	
});