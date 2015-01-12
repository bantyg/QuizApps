var sqlite3 = require("sqlite3").verbose();
var _ = require("lodash");
var fs = require("fs");

var recordQuizData = function(quiz,db,onComplete){
	db.run(quiz.insertQuery,function(err){
		db.run(quiz.createQuestionTable,function(egr){
			egr && console.log(egr);
			quiz.questions.forEach(function(question,index){
				var insertQuestions = "insert into "+quiz.tableName+"(question,answer)"+
									"values ('"+question.Q+"','"+question.A+"');";
				db.run(insertQuestions,function(eor){
					if(index == quiz.questions.length-1)
						onComplete(null);
				});
			});
		});
	});
};

var _createQuiz = function(quizDetails,db,onComplete){
	var insertQuery = "insert into quiz(title,noOfPlayers,timeOfQuiz,countDownTime,questionReference)"+
					"values ('"+quizDetails.title+"', '"+quizDetails.noOfPlayers+"', '"+quizDetails.time+"', '"
					+quizDetails.countdown+"','"+quizDetails.files.nameOfFile.originalname+"');";

	var questionFile = quizDetails.files.nameOfFile.name; 
	var questions  = JSON.parse(fs.readFileSync('./tmp/'+questionFile,'utf-8'));
	var tableName = quizDetails.files.nameOfFile.originalname.slice(0,quizDetails.files.nameOfFile.originalname.indexOf('.'));
	var createQuestionTable = "create table "+tableName+"(id integer primary key autoincrement,"+
							"question text not null,answer text not null)";
	var quiz = { insertQuery : insertQuery,
		createQuestionTable : createQuestionTable,
		questions : questions, tableName : tableName };
		
	recordQuizData(quiz,db,onComplete);
};		

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

var _getAvailableQuiz = function(db,onComplete){
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
		createQuiz : operate(_createQuiz),
		getAvailableQuiz:operate(_getAvailableQuiz),
		getEmailAndPassword : operate(_getEmailAndPassword)
	};
	return records;
};

exports.init = init;