module.exports = (function DBConnector(){
	
	var oracledb = require('oracledb');
	var dataSource = require('../resources/config/data-source.js');
	
	// Note: connections should always be released when not needed
	function close(connection)
	{
	  connection.close(
	    function(err) {
	      if (err) {
	        console.error(err.message);
	      }
	    });
	}
	
//    console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
//    console.log(result.rows);     // [ [ 180, 'Construction' ] ]
	
	return {
		selectValue: function( query ){
			
			// Get a non-pooled connection
			oracledb.getConnection( dataSource, function(err, connection){
				
			    if(err){
			      console.error(err.message);
			      return;
			    }
			    
			    connection.execute( query, [], function(err, result){
				        if (err) {
				          console.error(err.message);
				          close(connection);
				          return;
				        }
				        close(connection);
				        return result.rows[0];
			      });
			    
			  });
			
		},
		selectOne: function( query ){
			
			// Get a non-pooled connection
			oracledb.getConnection( dataSource, function(err, connection){
				
				if(err){
					console.error(err.message);
					return;
				}
				
				connection.execute( query, [], function(err, result){
					if (err) {
						console.error(err.message);
						close(connection);
						return;
					}
					close(connection);
					
					var one = {};
					one[ result.metaData[0].name ] = result.rows[0];
					
					return one;
				});
				
			});
			
		},
		selectList: function( query ){
			
			// Get a non-pooled connection
			oracledb.getConnection( dataSource, function(err, connection){
				
				if(err){
					console.error(err.message);
					return;
				}
				
				connection.execute( query, [], function(err, result){
					if (err) {
						console.error(err.message);
						close(connection);
						return;
					}
					close(connection);
					
					var list = [];
					for( var i=0; i<result.rows.length; ++i ){
						for( var j=0; j<result.metaData.length; ++j ){
							list[ result.metaData[j].name ] = result.rows[i][j];
						}
					}
					
					return list;
				});
				
			});
			
		},
	}
	
})();