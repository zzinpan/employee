// 라이브러리 가져오기
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
global.Async = require('async');
require('./src/dao/DBConnector.js');

// 요청 파라미터 쉽게 접근
(function setting_body_parser(){
	app.use( bodyParser.json() );       // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	}));
})();

// smc확장자 template 렌더링
(function setting_smc_ext_template(){
	app.engine('smc', function (filePath, options, callback) {
		fs.readFile(filePath, function (err, content) {
			
			if (err){
				return callback(new Error(err));
			}
			
			var mainHtml = content.toString();
			var promises = [];

			// 템플릿 추가
			fs.readFile("./webApp/WEB-INF/view/common/head.smc", function (err, head) {
				mainHtml = mainHtml.replace("{{common.head}}", head.toString());
				fs.readFile("./webApp/WEB-INF/view/common/header.smc", function (err, header) {
					mainHtml = mainHtml.replace("{{common.header}}", header.toString());
					fs.readFile("./webApp/WEB-INF/view/common/footer.smc", function (err, footer) {
						mainHtml = mainHtml.replace("{{common.footer}}", footer.toString());
						return callback(null, mainHtml);
					} );
				} );
			} );

		});
	});

	// view 경로 설정
	app.set('views', './webApp/WEB-INF/view');
	
	// 확장자 설정
	app.set('view engine', 'smc');
})();

// 정적 파일 불러오기
(function setting_static_files(){
	app.use('/lib', express.static('./webApp/lib'));
	app.use('/css', express.static('./webApp/css'));
	app.use('/js', express.static('./webApp/js'));
})();

// 컨트롤러 주입
(function inject_controller(){
	
	const controllerDirectories = [
		"./src/controller"
	];
	
	controllerDirectories.forEach(function( dir ){
		fs.readdir(dir, function(err, files){
			files.forEach(function(file){
				require( dir + "/" + file )(app);
			});
		});
	});
	
})();

// 디버깅 로그
(function setting_debug_logging(){
	
	var DEBUG = true;
	
	global.console.debug = function(){
		if( DEBUG === true ){
			global.console.log.apply( global.console, arguments );
		}
	};
	
})();

//http서버 실행
(function run_http_server(){
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
})();