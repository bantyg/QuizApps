var location = process.argv[2];
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(location);
var runAllQueries = function(){	
	var runQuery = function(q){
		console.log(q);
		db.run(q,function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
		});
	};

	[	"create table users(id integer primary key autoincrement,"+
			" name text, email text, password text);",
		"create table quiz(id integer primary key autoincrement, title text not null,"+
			" noOfPlayers integer, timeOfQuiz text not null, countDownTime text not null,"+
			"questionReference text not null);"

	].forEach(runQuery);
};
db.serialize(runAllQueries);