pragma foreign_keys = 'ON';
insert into users (id, name, email, password) 
	values (1,'vikas','vikassry@gmail.com', 'vikas'), (2,'vikas2','vikas2@email.com','vikas123');
insert into quiz(id,title,noOfPlayers,timeOfQuiz,countDownTime,questionReference)
	values (1,"movies",10,"00:02","00:02","00:01");	