var quizModules = require('./quizModules').init('./data/quiz.db');

exports.createQuiz = function(req,res){
	req.body.files  = req.files;
	quizModules.createQuiz(req.body,function(err){
		res.render('startPage');
	});
};