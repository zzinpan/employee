$(function department_global(){

	/*******************************
	 * 내부 변수
	 *******************************/
	var $template = $("#template");
	
	
	
	/*******************************
	 * 외부 컴포넌트 참조 변수
	 *******************************/
	window.Department = {
			
			/*******************************
			 * 공통 jquery 변수
			 *******************************/
			
				/**
				 * 메인
				 */
				$darkWar: $("#dark_war"), // 암전 배경
				$deptAddBtn: $("#dept_add_btn"), // 소속 추가 버튼
			
				/**
				 * 등록 팝업
				 */
				$deptRegCloseBtn: $("#dept_reg_pop_close_btn"), // 팝업 닫기 버튼
				$addDeptItemBtn: $("#add_dept_item_btn"), // 항목 추가 버튼
				$deptEmpUserList: $("#dept_emp_user_list"), // 사용자 추가 항목 목록
				$deptSaveBtn: $("#dept_save_btn"), // 소속 저장 버튼
				$deptNameInp: $("#dept_name_inp"), // 소속명 입력폼
				$deptEmpList: $("#dept_emp_list"), // 직원관리 항목 목록
				$deptSortSel: $("#dept_sort_sel"), // 소속 표시 순서
			
				
			/*******************************
			 * 공통 함수
			 *******************************/
				
				Template: {
					/**
					 * @desc 템플릿 복사
					 * @param String CSS-selector
					 * @return jquery
					 */
					clone: function getTemplate( selector ){
						return $template.find( selector ).clone();
					}
				}
	};
	
});