var quizModules = require('./quizModules').init('./data/quiz.db');
var lib = require('../modules/quizModules').init('./data/quiz.db');

exports.createQuiz = function(req,res){
	req.body.files  = req.files;
	quizModules.createQuiz(req.body,function(err){
    console.log(err)
		err && res.render('createQuiz',{error:"something went wrong"})
    !err && res.render('startPage');
	});
};

exports.login = function(req, res){
	var email = req.body.email;
  	lib.getEmailAndPassword(email,function(err, user){
  		if(user && req.body.password == user.password){
  			res.redirect('/dashboard/');
  		}
  		else {
  			res.render('login',{
  				error: 'invalid email or password'
  			});
  		}
  	});
};

exports.showAvailableQuiz = function(req,res){
	lib.getAvailableQuiz(function(err, availableQuiz){
		err && req.render('availableQuiz',{error:err})
		!err && res.render('availableQuiz',{availableQuiz:availableQuiz});
	});
};