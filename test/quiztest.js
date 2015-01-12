var lib = require('../modules/quizModules.js');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('test/data/quiz.db.backup');
var quizModules;

describe('quizModules',function(){
	beforeEach(function(){
		fs.writeFileSync('test/data/quiz.db',dbFileData);
		quizModules = lib.init('test/data/quiz.db');
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

	describe('#getEmailAndPassword', function() {
		it('retrieves email and password of if email is exist', function(done) {
			var expected = { id: 1,
				email: 'vikassry@gmail.com',
				name:'vikas',password: 'vikas'
			};
			quizModules.getEmailAndPassword('vikassry@gmail.com',function(err, users) {
				assert.notOk(err);
				assert.deepEqual(expected,users);
				done();
			});
		});
		it('gives error if email is not exist',function(done){
			quizModules.getEmailAndPassword('vikassry@email.com',function(err, users) {
				assert.notOk(err);
				assert.equal(users,undefined);
				done();
			})
		})
	});

	describe('#createQuiz',function(){
		it("creates new quiz with given information", function(done){
			var newQuiz = { 
				title: 'cricket',
				noOfPlayers: '11', time: '12:00',
				countdown: '02:00',
				files: {
					nameOfFile: {
						fieldname: 'nameOfFile',
				        originalname: 'a.json',
				        name: 'e76b03a3a36e7c59630aca97467fe527.json',
				        encoding: '7bit',
				        mimetype: 'application/octet-stream',
				        path: 'tmp\\e76b03a3a36e7c59630aca97467fe527.json',
				        extension: 'json',
				        size: 87,
				        truncated: false,
				        buffer: null 
				    }
				}
			};
			quizModules.createQuiz(newQuiz, function(err){
				assert.notOk(err);
				quizModules.getAvailableQuiz(function(err,quiz){
					assert.deepEqual(quiz, [{title:'movies',timeOfQuiz:'00:10:00'},
						{title:'cricket',timeOfQuiz:'12:00'}
						]);
					done();
				});
			});
		});
	});
});