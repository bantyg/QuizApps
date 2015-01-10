var express = require('express');
var lib = require('../modules/quizModules').init("data/quiz.db")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/availableQuiz',function(req,res){
	lib.getAvailableQuiz(function(err,availableQuiz){
		err && req.render('availableQuiz',{error:err})
		!err && res.render('availableQuiz',{availableQuiz:availableQuiz});
	})
})

module.exports = router;
