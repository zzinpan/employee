$(function department_reg_pop(){
	
	with( window.Department ){
		
		// 팝업 기능
		var RegPop = {
				
				// 팝업 초기화
				clear: function clear(){
					$deptNameInp.val("");
					$deptSortSel.find( ".dept_sort_opt" ).remove();
					$deptEmpUserList.empty();
					this.DEIL = [];
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
			var $deptEmpItem = Template.clone( ".reg_pop .dept_emp_item" );
			$deptEmpUserList.append( $deptEmpItem );
		});
		
		// 항목 삭제
		$deptEmpUserList.on("click", ".dept_emp_item_del_btn", function(){
			var $deptEmpItem = $(this).closest( ".dept_emp_item" );
			var empItemId = $deptEmpItem.data("empItemId");
			
			// 불러온 항목이었다면 삭제 플래그
			if( empItemId != null ){
				$deptEmpItem.hide();
				
			// 신규로 추가한 항목이었다면, 그냥 삭제
			}else{
				$deptEmpItem.remove();
			}
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
			if( deptSort == "NO_SELECT" ){
				$deptSortSel.focus();
				alert("순서를 선택하세요.");
				return;
			}
			
			var saveType = $deptSaveBtn.data("saveType");
			if( saveType === "CREATE" ){
				
				var empItemNms = [];
				var $deptEmpItemInps = $deptEmpList.find(".dept_emp_item_inp");
				for( var i=0; i<$deptEmpItemInps.length; ++i ){
					var $deptEmpItemInp = $deptEmpItemInps.eq(i);
					var empItemNm = $deptEmpItemInp.val().trim();
					if( empItemNm == "" ){
						$deptEmpItemInp.focus();
						alert("항목을 입력하세요.");
						return;
					}
					empItemNms.push( empItemNm );
				}
				
				XHR.createDeptInfo( deptName, deptSort, empItemNms, function(){
					alert( "등록되었습니다." );
					Dom.refreshDeptList();
					RegPop.close();
				} );
				
			}else if( saveType === "MODIFY" ){
				
				var removeEmpItemNames = [];
				var createEmpItemList = [];
				var modifyEmpItemList = [];
				var beforeDeptInfo = $deptSaveBtn.data("deptInfo");
				var $deptEmpItems = $deptEmpUserList.find(".dept_emp_item")
				var $showItems = $deptEmpItems.filter(":visible");
				var $hideItems = $deptEmpItems.not(":visible");
				
				// 삭제 목록 출력
				for( var i=0; i<$hideItems.length; ++i ){
					var $deptEmpItem = $hideItems.eq(i);
					var empItemId = $deptEmpItem.data("empItemId");
					removeEmpItemNames.push( empItemId );
				}
				
				for( var i=0; i<$showItems.length; ++i ){
					var $deptEmpItem = $showItems.eq(i);
					var nowEmpItemSort = i+1;
					var $deptEmpItemInp = $deptEmpItem.find(".dept_emp_item_inp");
					var nowEmpItemName = $deptEmpItemInp.val().trim();
					if( nowEmpItemName == "" ){
						$deptEmpItemInp.focus();
						alert("항목을 입력하세요.");
						return;
					}
					var beforeData = $deptEmpItem.data();
					
					// 추가 목록 출력
					if( beforeData.empItemId == null ){
						createEmpItemList.push({
							empItemName: nowEmpItemName,
						    empItemSort: nowEmpItemSort
						});
						continue;
					}

					var isChangeSort = nowEmpItemSort != beforeData.empItemSort;
					var isChangeName = nowEmpItemName != beforeData.empItemName;
					
					// 수정 목록 출력
					if( isChangeSort == true || isChangeName == true ){
						modifyEmpItemList.push({
							empItemId: beforeData.empItemId,
							empItemName: nowEmpItemName,
						    empItemSort: nowEmpItemSort
						});
					}
					
				}
				
				if( 
						beforeDeptInfo.deptName == deptName && 
						beforeDeptInfo.deptSort == deptSort && 
						createEmpItemList.length === 0 && 
						modifyEmpItemList.length === 0 && 
						removeEmpItemNames.length === 0
					){

					alert( "변경사항이 없습니다." );
					return;
					
				}
				
				XHR.modifyDeptInfo( deptId, deptName, deptSort, createEmpItemList, modifyEmpItemList, removeEmpItemNames, function(){
					alert( "수정되었습니다." );
					Dom.refreshDeptList();
					RegPop.close();
				} );
				
			}
			
		});
		
	}
	
});