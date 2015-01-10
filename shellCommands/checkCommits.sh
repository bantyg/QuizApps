while [[ true ]]; 
do
	a=`git ls-remote https://github.com/bantyg/QuizApps.git HEAD | cut -c1-40`
	b=`git rev-parse HEAD`
	if [ "$a" != "$b" ]
		then
			echo $a
			echo $b
			echo -e '/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a/a Need to update'
			sh shellCommands/pullCommit.sh
		else
			echo "Update-to-date"
	fi
	sleep 2m
done