pragma foreign_keys = 'ON';
insert into users(emailId,secret) 
	values ("pooja@email.com","qwerty");
insert into quiz(id,title,noOfPlayers,timeOfQuiz,countDownTime,questionReference)
	values (1,"movies",10,"00:02","00:02","00:01");	