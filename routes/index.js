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

router.post('/login', quiz_routes.login);

router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

router.post('/startQuiz',quiz_routes.createQuiz);

router.get('/availableQuiz', quiz_routes.showAvailableQuiz);

module.exports = router;