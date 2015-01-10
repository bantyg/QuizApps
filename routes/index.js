var express = require('express');
var router = express.Router();
var quiz_routes = require('../modules/quiz_routes');

/* GET home page. */

router.get('/createQuiz',function(req, res){
	res.render('createQuiz')
});

router.post('/startQuiz',quiz_routes.createQuiz);

module.exports = router;
