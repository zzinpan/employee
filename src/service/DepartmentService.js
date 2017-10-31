module.exports = (function DepartmentService(){
	
	var deptQuery = require("../resources/query/department.js");
	var empQuery = require("../resources/query/employee.js");
	
	return {

		/**
		 * 소속 등록
		 */
		createDeptInfo: function createDeptInfo( deptName, deptSort, empItemNames, controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				var deptId = null;
				var deptEmpItemList = [];
				
				connection.transaction([
					
					// 신규 소속 아이디 조회
					function selectNewDeptId( callback ){
						connection.query( deptQuery.selectNewDeptId, function( error, result ){
							deptId = result[0].DEPT_ID;
							callback();
						} );
					},
					
					// 소속 등록 전, 기존 소속의 소속 순서 갱신
					function updateDeptSortByInsertDeptInfo( callback ){
						connection.update( deptQuery.updateDeptSortByInsertDeptInfo, {
							deptSort: deptSort
						},{}, callback );
					},
					
					// 소속 등록
					function insertDeptInfo( callback ){
						connection.insert( deptQuery.insertDeptInfo, {
							deptId: deptId,
							deptName: deptName,
							deptSort: deptSort
						},{}, function( error, result ){
							// 데이터 가공
							for( var i=0; i<empItemNames.length; ++i ){
								deptEmpItemList.push( {
									deptId: deptId,
									empItemName: empItemNames[ i ],
									empItemSort: i 
								} );
							}
							callback();
						} );
						
						
					},
					
					// 소속에서 관리할 직원 항목을 등록
					function insertEmpItemKeyInfo( callback ){
						connection.batchInsert( empQuery.insertEmpItemKeyInfo, deptEmpItemList, {}, callback );
					}
					
				],{
					  sequence: true,
					  autoCommit: true
				}, callback );
				
			},{
		    sequence: true
		  }, controllerCallback );
			
		},
		
		/**
		 * 소속 수정
		 */
		modifyDeptInfo: function modifyDeptInfo( deptId, deptName, afterDeptSort, empItemNames, controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				connection.transaction([
					
					function updateDeptInfo( callback ){
						
						// 기존 소속정보 조회
						connection.query( deptQuery.selectDeptInfoByDeptId, {
							deptId: deptId
						}, function( error, result ){

							var beforeDeptSort = result[ 0 ].deptSort;
							var updateSortQuery = null;
							
							// 소속 수정 전, 기존 소속의 소속 순서 갱신
							if( beforeDeptSort < afterDeptSort ){
								updateSortQuery = deptQuery.updateDeptSortByIncrease;
							}else{
								updateSortQuery = deptQuery.updateDeptSortByDecrease;
							}
							connection.update( updateSortQuery, {
								beforeDeptSort: beforeDeptSort,
								afterDeptSort: afterDeptSort
							},{}, function( error, result ){
								
								// 소속 수정
								connection.update( deptQuery.updateDeptInfo, {
									deptId: deptId,
									deptName: deptName,
									deptSort: afterDeptSort
								},{}, function( error, result ){
									
									// 기존 직원 항목 전부 삭제
									connection.execute( empQuery.deleteEmpItemKeyInfoByDeptId, { 
										deptId: deptId
									}, function( error, result ){
										
										// 데이터 가공
										var bindingData = [];
										for( var i=0; i<empItemNames.length; ++i ){
											bindingData.push( {
												deptId: deptId,
												empItemName: empItemNames[ i ],
												empItemSort: i 
											} );
										}
										
										// 소속에서 관리할 직원 항목을 등록
										connection.batchInsert( empQuery.insertEmpItemKeyInfo, bindingData, {}, callback );
										
									} );
									
								} );
								
							} );
							
						} );
							
					}
					
					],{
					sequence: true,
					autoCommit: true
				}, callback);
				
			}, controllerCallback );
			
		},
		
		/**
		 * 소속 목록 조회
		 */
		getDeptList: function getDeptList( controllerCallback ){
			
			
			Pool.run(function( connection, callback ){
			
				connection.transaction([
					
					// 소속 목록 조회
					function selectDeptList( callback ){
						connection.query( deptQuery.selectDeptList, callback );
					},
					// 소속에서 관리하는 직원 항목 조회
					function selectDeptEmpItemList( callback ){
						connection.query( deptQuery.selectDeptEmpItemList, callback );
					},
				
				],{
					  sequence: true,
					  autoCommit: true
				}, callback);
				
			}, function dataFormat( error, result ){
				
				var deptData = {
						deptList: result[ 0 ],
						deptEmpItemList: result[ 1 ]
				};
				
				controllerCallback( error, deptData );
				
			} );
			
		},
		
		/**
		 * 소속 수 조회
		 */
		getDeptCnt: function getDeptCnt( controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				connection.query( deptQuery.selectDeptCnt, callback );
				
			}, function dataFormat( error, result ){
				
				var deptCnt = result[ 0 ].deptCnt;
				controllerCallback( error, deptCnt );
				
			});
			
		},
		
		/**
		 * 소속 삭제
		 */
		removeDeptInfo: function removeDeptInfo( deptId, controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				connection.transaction([
					
					function deleteDeptInfo( callback ){
						
						// 삭제할 소속정보 조회
						connection.query( deptQuery.selectDeptInfoByDeptId, {
							deptId: deptId
						}, function( error, result ){
							
							// 삭제에 의한 소속목록 순서 갱신
							var deptSort = result[0].deptSort;
							connection.update( deptQuery.updateDeptSortByDeleteDeptInfo, {
								deptSort: deptSort
							}, {}, function( error, result ){
								
								// 소속정보 삭제
								connection.update( deptQuery.updateDeptDeleteYnByDeptId, {
									deptId: deptId,
									deptDeleteYn: "Y"
								}, {}, callback );
								
							} );
							
						} );
						
					}
					
				],{
					  sequence: true,
					  autoCommit: true
				}, callback);
				
			}, function dataFormat( error, result ){
				controllerCallback( error, result );
			} );
				
			
		},
		
		/**
		 * 소속 수 조회
		 */
		getDeptInfo: function getDeptInfo( deptId, controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				connection.query( deptQuery.selectDeptInfoByDeptId, {
					deptId: deptId
				}, callback );
				
			}, function dataFormat( error, result ){
				
				var deptInfo = result[ 0 ];
				controllerCallback( error, deptInfo );
				
			});
			
		},
		
		/**
		 * 소속 직원관리항목 조회
		 */
		getDeptEmpItemList: function getDeptEmpItemList( deptId, controllerCallback ){
			
			Pool.run(function( connection, callback ){
				
				connection.query( deptQuery.selectDeptEmpItemListByDeptId, {
					deptId: deptId
				}, callback );
				
			}, controllerCallback );
			
		},
		
	};
	
})();