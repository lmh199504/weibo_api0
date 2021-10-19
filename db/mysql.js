var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'weibo'
});

connection.connect(err => {
	if (err) throw err;
	console.log('mysql connncted success!');
});

connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
});

connection.query('SElECT * FROM user', (error, results, fields) => {
	console.log(results)
})
