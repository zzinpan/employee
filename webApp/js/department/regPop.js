$(function department_reg_pop(){
	
	with( window.Department ){
		
		// 팝업 기능
		var RegPop = {
				
				// 팝업 초기화
				clear: function clear(){
					$deptNameInp.val("");
					$deptEmpUserList.empty();
				},
		
				// 팝업 닫기
				close: function close(){
					$darkWar.stop().fadeOut( 500, function(){
						RegPop.clear();
					} );
				}
			};
		
		// 팝업 닫기
		$deptRegCloseBtn.on("click", function(){
			RegPop.close();
		});
		
		// 항목 추가
		$addDeptItemBtn.on("click", function(){
			var $deptEmpItem = Template.clone( ".dept_emp_item" );
			$deptEmpUserList.append( $deptEmpItem );
		});
		
		// 항목 삭제
		$deptEmpUserList.on("click", ".dept_emp_item_del_btn", function(){
			var $deptEmpItem = $(this).closest( ".dept_emp_item" );
			$deptEmpItem.remove();
		});
		
		// 항목 순서 변경
		$deptEmpUserList.on("click", ".dept_emp_item_move_btn", function(){
			var $this = $(this);
			var $deptEmpItem = $this.closest( ".dept_emp_item" );
			var moveType = $this.attr("data-move_type");
			if( moveType === "up" ){
				$deptEmpItem.prev().before( $deptEmpItem );
			}else if( moveType === "down" ){
				$deptEmpItem.next().after( $deptEmpItem );
			}
			$deptEmpItem.find(".dept_emp_item_inp").focus();
		});
		
		// 소속 저장
		$deptSaveBtn.on("click", function(){
			
			var deptName = $deptNameInp
									.val()
									.trim();
			
			if( deptName == "" ){
				$deptNameInp.focus();
				alert("소속명을 입력하세요.");
				return;
			}
			
			var deptSort = $deptSortSel.val();
			
			var empItemNms = [];
			var $deptEmpItemInps = $deptEmpList.find(".dept_emp_item_inp");
			for( var i=0; i<$deptEmpItemInps.length; ++i ){
				var empItemNm = $deptEmpItemInps.eq(i).val().trim();
				if( empItemNm == "" ){
					$deptEmpItemInps.eq(i).focus();
					alert("항목을 입력하세요.");
					return false;
				}
				empItemNms.push( empItemNm );
			}
			
			XHR.createDeptInfo( deptName, deptSort, empItemNms, function(){
				alert( "저장되었습니다." );
				RegPop.close();
			} );
			
		});
		
	}
	
});