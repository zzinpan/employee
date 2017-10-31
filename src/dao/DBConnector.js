module.exports = (function DBConnector(){
	
	var oracleDB = require('oracledb');
	var simpleOracleDB = require('simple-oracledb');
	var dataSource = require('../resources/config/data-source.js');
	simpleOracleDB.extend( oracleDB );

	oracleDB.createPool({
		user: dataSource.user,
		password: dataSource.password,
		connectString: dataSource.connectString,
	}, function onPoolCreated(error, pool) {
		global.Pool = pool;
	});
	
})();