var quizModules = require('../modules/quizModules');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('test/data/quiz.db.backup');

var quizModules;
describe('quizModules',function(){
	beforeEach(function(){
		fs.writeFileSync('test/data/quiz.db',dbFileData);
		quizModules = quizModules.init('test/data/quiz.db');
	});
	describe('#getavailable',function(){
		var expected = [ { title: 'movies', timeOfQuiz: '00:10:00' } ];
		it('retrieves available quizes',function(done){
			quizModules.getAvailableQuiz(function(err,availableQuiz){
				assert.notOk(err);
				assert.deepEqual(availableQuiz, expected);
				done();
			});
		});
	});
})