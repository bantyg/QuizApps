var lib = require('../modules/quizMudules.js');
var assert = require('chai').assert;

describe('#addition',function(){
		it('should give 5',function(done){
			assert.equal(50,lib.add(2,3));
			done();
		});
})