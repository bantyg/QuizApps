var lib = require('../modules/quizModules.js');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('test/data/quiz.db.backup');

var quizModules;
describe('quizModules', function() {
	beforeEach(function() {
		fs.writeFileSync('test/data/quiz.db', dbFileData);
		quizModules = lib.init('test/data/quiz.db');
	});

	describe('#getEmailAndPassword', function() {
		it('retrieves email and password of if email is exist', function(done) {
			expected={
					id: 1,
					email: 'vikassry@gmail.com',
					name:'vikas',
					password: 'vikas'
					};
			quizModules.getEmailAndPassword('vikassry@gmail.com',function(err, users) {
				assert.notOk(err);
				assert.deepEqual(expected,users)
				done();
			});
		});
		it('gives error if email is not exist',function(done){
			quizModules.getEmailAndPassword('vikassry@email.com',function(err, users) {
				assert.notOk(err);
				done();
			});
		});
	});
});