$(function department_main(){
	
	with( window.Department ){
		
		// 소속추가 클릭
		$deptAddBtn.on("click", function(){
			
			$deptRegPopTitle.text("소속 등록");
			$deptSaveBtn.data( "saveType", "CREATE" );
			
			// 소속 수량 조회하여 순서 선택값 세팅
			XHR.getDeptCnt( function( deptCnt ){
				
				for( var i=0; i<deptCnt+1; ++i ){
					var $option = Template.clone( ".reg_pop .dept_sort_opt" );
					$option.text( i+1 );
					$option.val( i );
					$option.appendTo( $deptSortSel );
				}
				
			} );
			$darkWar.fadeIn( 500 );
		});
		
		// 소속삭제 클릭
		$deptList.on("click", ".dept_remove_btn", function(){
			
			var isTrue = confirm("삭제하시겠습니까?");
			if( isTrue ){

				var deptId = $(this).closest(".dept_container").data("deptId");
				XHR.removeDeptInfo( deptId, function(){
					
					alert("삭제되었습니다.");
					Dom.refreshDeptList();
					
				} );
				
			}
			
		});
		
		// 소속수정 클릭
		$deptList.on("click", ".dept_modify_btn", function(){
			
			var deptId = $(this).closest(".dept_container").data("deptId");

			$deptRegPopTitle.text("소속 수정");
			$deptSaveBtn.data( {
				saveType: "MODIFY",
				deptId: deptId
			} );
			
			XHR.getDeptInfo( deptId, function( deptInfo ){
				
				XHR.getDeptCnt( function( deptCnt ){
					
					for( var i=0; i<deptCnt; ++i ){
						var $option = Template.clone( ".reg_pop .dept_sort_opt" );
						$option.text( i+1 );
						$option.val( i );
						$option.appendTo( $deptSortSel );
					}
					$deptSortSel.val( deptInfo.deptSort );
					
				} );
				
				XHR.getDeptEmpItemList( deptId, function( deptEmpItemList ){

					for( var i=1; i<deptEmpItemList.length; ++i ){
						var deptEmpItem = deptEmpItemList[ i ];
						var $deptEmpItem = Template.clone( ".reg_pop .dept_emp_item" );
						$deptEmpItem.data( deptEmpItem );
						$deptEmpItem.find(".dept_emp_item_inp").val( deptEmpItem.empItemName );
						$deptEmpItem.appendTo( $deptEmpUserList );
					}
					
				} );
				
				$deptNameInp.val( deptInfo.deptName );
				
			} );
			$darkWar.fadeIn( 500 );
			
		});
		
		// 목록 조회
		Dom.refreshDeptList();
		
	}
	
});