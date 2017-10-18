module.exports = (function setting_util(){

	/**
	 * @description
	 * 	문자열에서 특정 문자열이 있는지 검사
	 * @parameter
	 * 	string
	 * @return
	 * 	boolean
	 */
	String.prototype.hasString = function hasString( str ){
		if( this.indexOf( str ) > -1 ){
			return true;
		}
		return false;
	};
	
})();