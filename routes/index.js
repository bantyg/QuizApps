var express = require('express');

var lib = require('../modules/quizModules').init('./data/quiz.db');
var router = express.Router();
var quiz_routes = require('../modules/quiz_routes');

/* GET home page. */

router.get('/createQuiz',function(req, res){
	res.render('createQuiz');
});

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
	var email = req.body.email;
  lib.getEmailAndPassword(email,function(err, user) {
    if (user && req.body.password == user.password) {
      res.redirect('/dashboard/');
    } else
      res.render('login', {
        error: 'invalid email or password'
      });
  });
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

router.post('/startQuiz',quiz_routes.createQuiz);

router.get('/availableQuiz',function(req,res){
	lib.getAvailableQuiz(function(err,availableQuiz){
		err && req.render('availableQuiz',{error:err})
		!err && res.render('availableQuiz',{availableQuiz:availableQuiz});
	})
})

module.exports = router;