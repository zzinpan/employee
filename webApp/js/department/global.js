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
				$deptList: $("#dept_list"), // 소속 목록
				$deptRegPopTitle: $("#dept_reg_pop_title"), // 제목
				
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
				},
				
				Dom: {
					
					refreshDeptList: function refreshDeptList( callback ){
						XHR.getDeptList( function( deptData ){
							with( window.Department ){
								
								// 소속 목록 초기화
								$deptList.empty();
								
								for( var i=0; i<deptData.deptList.length; ++i ){
									
									var deptInfo = deptData.deptList[ i ];
									var $deptInfo = Template.clone( ".main .dept_container" );
									var $deptEmpItemList = $deptInfo.find(".dept_emp_item_list");

									for( var j=deptData.deptEmpItemList.length-1; j>-1; --j ){
										var deptEmpItem = deptData.deptEmpItemList[ j ];
										if( deptInfo.deptId === deptEmpItem.deptId ){
											var $deptEmpItem = Template.clone( ".main .dept_emp_item" );
											$deptEmpItem.text( deptEmpItem.empItemName );
											$deptEmpItem.data( deptEmpItem );
											$deptEmpItem.prependTo( $deptEmpItemList );
											deptData.deptEmpItemList.splice( j, 1 );
										}
									}
									
									$deptInfo.data({
										deptId: deptInfo.deptId,
										deptName: deptInfo.deptName,
										deptSort: deptInfo.deptSort,
										deptDeleteYn: deptInfo.deptDeleteYn,
										deptRegDate: deptInfo.deptRegDate,
										deptUpDate: deptInfo.deptUpDate
									});
									
									$deptInfo.find(".dept_title").text( deptInfo.deptName );
									
									$deptInfo.appendTo( $deptList );
									
								}
								
								if( typeof callback === "function" ){
									callback( deptList );
								}
								
							}
						} );
					}
					
				}
				
				
	};
	
});