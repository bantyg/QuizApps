var sqlite3 = require("sqlite3").verbose();
var _ = require("lodash");


var _getEmailAndPassword = function(email,db, onComplete) {
	var select_query = "select * from users where email = '"+email+"';";
	db.get(select_query, function(err,userDetail){
			if(!userDetail){
				onComplete(null, null);
				return;
			}
			onComplete(null,userDetail);
	});
};

var _availableQuiz = function(db,onComplete){
	var availableQuiz = "select title , timeOfquiz from quiz";
	
	db.all(availableQuiz,function(err,quizs){
		onComplete(null,quizs)
	});
};

var init = function(location){	
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var onDBOpen = function(err){
				if(err){onComplete(err);return;}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location,onDBOpen);
		};	
	};

	var records = {		
		getAvailableQuiz:operate(_availableQuiz),
		getEmailAndPassword : operate(_getEmailAndPassword)
	};
	return records;
};

exports.init = init;
