var sqlite3 = require("sqlite3").verbose();
var _ = require("lodash");
var fs = require("fs");

var _createQuiz = function(quizDetails,db,onComplete){
	var insertQuery = "insert into quiz(title,noOfPlayers,timeOfQuiz,countDownTime,questionReference)"+
					"values ('"+quizDetails.title+"', '"+quizDetails.noOfPlayers+"', '"+quizDetails.time+"', '"
					+quizDetails.countdown+"','"+quizDetails.files.nameOfFile.originalname+"');";
	console.log('Details',quizDetails);

	var questionFile = quizDetails.files.nameOfFile.name; 
	var questions  = JSON.parse(fs.readFileSync('./tmp/'+questionFile,'utf-8'));
	var tableName = quizDetails.files.nameOfFile.originalname.slice(0,quizDetails.files.nameOfFile.originalname.indexOf('.'));
	var createQuestionTable = "create table "+tableName+"(id integer primary key autoincrement,"+
							"question text not null,answer text not null)";

	db.run(insertQuery,function(err){
		db.run(createQuestionTable,function(egr){
			egr && console.log(egr);
			questions.forEach(function(question,index){
				var insertQuestions = "insert into "+tableName+"(question,answer)"+
									"values ('"+question.Q+"','"+question.A+"');";
				db.run(insertQuestions,function(eor){
					if(index == questions.length-1)
						onComplete(null);
				});
			});
		});
	});
};		

var _getEmailAndPassword = function(email,db,onComplete) {
	var select_query = "select * from users where email = '"+ email +"';";
	db.get(select_query, function(err,userDetail){
		if(!userDetail){
			onComplete(null, null);
			return;
		}
		onComplete(null,userDetail);
	});
};

var init = function(location) {
	var operate = function(operation) {
		return function() {
			var onComplete = (arguments.length == 2) ? arguments[1] : arguments[0];
			var arg = (arguments.length == 2) && arguments[0];
			var onDBOpen = function(err) {
				if (err) {
					onComplete(err);
					return;
				}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg, db, onComplete);
				arg || operation(db, onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location, onDBOpen);
		};
	};
	var records = {
		createQuiz : operate(_createQuiz),
		getEmailAndPassword : operate(_getEmailAndPassword)
	};
	return records;
};

exports.init = init;